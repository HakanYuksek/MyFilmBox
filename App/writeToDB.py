import pandas as pd
import sqlite3

data = pd.read_csv("IMDB.csv")

connection = sqlite3.connect("MyFilmBox.db")

cursor = connection.cursor()

i = 1

for each in data.values:
    name = each[1]
    year = each[3]
    genre = each[5]
    country = each[7]
    director = each[9]
    description = each[13]
    avg_vote = each[14]
    query = "insert into Movies(Name,Year,Kind,Country,Director,Vote,Story) Values(?,?,?,?,?,?,?)"
    cursor.execute(query,(name,year,genre,country,director,avg_vote,description))
    connection.commit()
    print(str(i)+"-)"+str(each[1])+" ekledim...")
    i += 1
connection.close()
"""
title = Name
year = Year
  - = Imdb
avg_vote = Imdb_Point
genre = Kind
description  = Story
director = Director
country = Country
"""
