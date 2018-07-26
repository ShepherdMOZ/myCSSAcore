# -*- coding: utf-8 -*-
#
#   course.py
#   for fetching course and major information from unimelb handbook
#
#   Shouyin, Jun 27 2018
#
#   最好不要每次请求都重新获取一遍course及major表
#   定期获取一遍 序列化之后用另一个线程访问 in queue
#
#########################

import requests
import json
from bs4 import BeautifulSoup

DOMAIN_URL = "https://handbook.unimelb.edu.au"

SEARCH_URL = "https://handbook.unimelb.edu.au/search"
PARSER = "html.parser"

CRS_LST_NAME = "course_list"
MJR_LST_NAME = "major_list"

study_types = ["undergraduate", "graduate", "research"]


#########################
#
#   get all courses
#
#########################
def get_courses(session, study_type, department, name):
    params = {
                "query": "",
                "year": "2018",
                "types[]": "course",
                "level_type[]": study_type,
                "study_periods[]": "all",
                "area_of_study": "all",
                "faculty": "all",
                "department": department
              }
    course_get = session.get(SEARCH_URL, params = params)
    new_soup = BeautifulSoup(course_get.text, PARSER)
    
    total_pages_element = new_soup.find_all("div", class_="search-results__paginate")
    total_pages = int(total_pages_element[0].find("span").text.split(' ')[1])

    result_courses = {"type": CRS_LST_NAME,
                      "name": name,
                      "items": []}

    result_courses["items"] += get_items_from_page_list(new_soup)

    for page in range(1, total_pages + 1):
        params["page"] = page
        course_get = session.get(SEARCH_URL, params = params)
        new_soup = BeautifulSoup(course_get.text, PARSER)
        result_courses["items"] += get_items_from_page_list(new_soup)

        
    return result_courses


#########################
#
#   get all majors of a course
#
#########################
def get_majors(session, course_url):
    if DOMAIN_URL not in course_url:
        if course_url[0] != '''/''':
            course_url = '''/''' + course_url
        course_url = DOMAIN_URL + course_url

    course_page = session.get(course_url)
    new_soup = BeautifulSoup(course_page.text, PARSER)

    course_name = get_page_title(new_soup)

    result_majors = {"type": MJR_LST_NAME,
                      "name": course_name,
                      "items": []}

    nav_bar = new_soup.find(class_="course__sidebar-navigation")
    major_url = ""
    for nav_item in nav_bar.find_all("li"):
        a = nav_item.find('a')
        if "Majors" in a.text:
            major_url = a.attrs["href"]
            break

    if major_url != "":
        major_page = session.get(DOMAIN_URL + major_url)
        new_soup = BeautifulSoup(major_page.text, PARSER)
        result_majors["items"] = result_majors["items"] + get_items_from_page_table(new_soup)

    return result_majors


#########################
#
#   get list of department
#
#########################
def get_search_params(session):
    search_get = session.get(SEARCH_URL)
    new_soup = BeautifulSoup(search_get.text, PARSER)

    search_details = {"Department": []}

    sidebar = new_soup.find("select", id="search-results-form--department")
    options = sidebar.find_all("option")

    for option in options:
        search_details["Department"].append([option.attrs["value"], option.text])

    return search_details


#########################
#
#   helpers
#
#########################
def get_items_from_page_list(new_soup):
    items = new_soup.find_all("li", class_="search-results__accordion-item")
    items_in_page = []
    for item in items:
        item_object = {}
        item_a = item.find("a", class_="search-results__accordion-title")
        item_object["item_name"] = item_a.text
        item_object["item_url"] = item_a.attrs["href"]
        items_in_page.append(item_object)

    return items_in_page


def get_page_title(new_soup):
    title = new_soup.find_all("h1")
    title = title[0].find("span").text
    
    return title


def get_items_from_page_table(new_soup):
    items_tables = new_soup.find_all("table")
    items_in_page = []
    for items_table in items_tables:
        items = items_table.find_all("tr")
        for item in items:
            if not item.find("th"):
                item_object = {}
                item_td = item.find("td")
                item_td_a = item_td.find('a')
                item_object["item_name"] = item_td_a.text
                item_object["item_url"] = item_td_a.attrs["href"]
                items_in_page.append(item_object)

    return items_in_page


#########################
#
#   main
#
#########################
def main():
    session = requests.Session()

    # examples
    
    # get list of department
    department = get_search_params(session)["Department"]
    print(department)

    # get courses in a department, of study_types[0] (undergraduate)
    result = get_courses(session, study_types[0], department[2][0], "Undergraduate")
    print(result)
    print("===")

    # print majors in a course
    print(get_majors(session, DOMAIN_URL + result["items"][3]["item_url"]))
    session.close()
    


if __name__ == '__main__':
    main()
    
