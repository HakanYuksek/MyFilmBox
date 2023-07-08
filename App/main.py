from flask import Flask, flash, redirect, render_template, request, session, abort
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import json
from passlib.hash import sha256_crypt
import os
from flask_session import Session
import pandas as pd

import recommendation as rm

	
app = Flask(__name__)


#SESSION AYARLARI
SESSION_TYPE = 'filesystem'
SESSION_FILE_DIR = os.path.join(app.root_path,"session_files")
app.config.from_object(__name__)
Session(app)

data = pd.read_csv("IMDB.csv",encoding = "latin")
movie_names = data["name"]
year = data["year"]
genre = data["genre"]
point = data["score"]

dataset = data
data = pd.concat([movie_names,year,genre,point],axis=1)


@app.route("/")
def index():
    if not session.get('logged_in'):
        return render_template("HomePage.html")
    else:
        username = session["username"]
        
        con = sqlite3.connect('MyFilmBox.db')
        query = "select MovieName from MyMovies where Username='"+username+"'"
        my_movies = pd.read_sql(query,con)

        query = "select numberOfRecommendation,LastVisit from Users where Username='"+username+"'"
        user_data = pd.read_sql(query,con)
        con.close()

        numberOfMovies = len(my_movies.values)
        numOfRecomm = user_data["numberOfRecommendation"].values[0]
        LastVisit = user_data["LastVisit"].values[0]
        
        return render_template("index.html",username=session["username"],numberOfMovies = numberOfMovies,numOfRecomm = numOfRecomm, LastVisit= LastVisit)
    
@app.route("/login",methods=["GET","POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
    
        con = sqlite3.connect('MyFilmBox.db')

        cur = con.cursor()


        query = "select * from Users where Username=?"
        
        cur.execute(query,(username,))

        rows = cur.fetchone()
        
        if rows is not None:
            if sha256_crypt.verify(password,str(rows[2])):
                con.close()
                session['logged_in'] = True
                session["username"] = username

                return render_template("index.html",username=username)
            else:
                print('wrong password!')
        else:
                print('wrong username!')
        con.close()
    
        return redirect(url_for('/'))
    else:
        return render_template("login.html")
    
@app.route("/sign_up")
def sign_up():
    if not session.get('logged_in'):
        return render_template("register.html")

@app.route("/register",methods=["POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]
        if username != None and password!= None:
            
            con = sqlite3.connect('MyFilmBox.db')

            cur = con.cursor()

            query = "select * from Users where Username="+"'"+username+"'"
            
            #print(query)
            
            cur.execute(query)

            rows = cur.fetchone()

            #if rows[0] != None:
             #   flash("There is already user with the same name")
              #  return index()
            #else:
            password = sha256_crypt.encrypt(password)
            numberOfRecommendation = 0
            LastVisit = "Today"
            query = "insert into Users values(?,?,?,?)"
            cur.execute(query,(username,email,password,numberOfRecommendation))
            con.commit()

            con.close()
            session["logged_in"]= True
            session["username"]=username
            session["password"]=password

            return render_template("index.html",username=username)

@app.route("/logout")
def logout():
    session['logged_in'] = False
    session.pop("username",None)
    session.pop("password",None)
    return index()

@app.route("/about")
def about():
    if session["logged_in"]:
        return render_template("about.html",username=session["username"])
    else:
        return render_template("about.html",username="not")


@app.route("/movies")
def showMovies():
    if session["logged_in"]:

        username = session["username"]
        
        con = sqlite3.connect('MyFilmBox.db')
        query = "select MovieName,MyPoint from MyMovies where Username='"+username+"'"
        my_movies = pd.read_sql(query,con)
        con.close()

        #data1 = data.iloc[:100]
        data1  = data
        return render_template("movies.html",username=session["username"],all_movies=data1.values,my_movies= my_movies,len=len)
    else:
        return render_template("HomePage.html")

@app.route("/mymovies")
def showMyMovies():
    if session["logged_in"]:

        username = session["username"]
        
        con = sqlite3.connect('MyFilmBox.db')
        query = "select MovieName,MyPoint from MyMovies where Username='"+username+"'"
        my_movies = pd.read_sql(query,con)
        con.close()

        movies  = []
        #data1 = data.iloc[:100]
        for each in my_movies.values:
            if len(data[data["name"]==each[0]].values) > 0:
                movies.append([data[data["name"]==each[0]]["name"].values[0],data[data["name"]==each[0]]["year"].values[0],
                               data[data["name"]==each[0]]["genre"].values[0]
                               ,data[data["name"]==each[0]]["score"].values[0]])

        data1  = movies
        
        return render_template("mymovies.html",username=session["username"],all_movies=data1,my_movies= my_movies,len=len)
    else:
        return render_template("HomePage.html")

@app.route("/jquery/addMovie",methods=["POST"])
def addToList():
    if request.method == "POST":
        if session["logged_in"]:
            username = session["username"]
            movieName = request.form["myData"]
            movieName = movieName[1:]
            
            conn = sqlite3.connect("MyFilmBox.db")

            cursor = conn.cursor()

            query = "insert into MyMovies(Username,MovieName) values(?,?)"

            cursor.execute(query,(username,movieName,))    
            conn.commit()
        
            query = "select MovieName,MyPoint from MyMovies where Username='"+username+"'"
            my_movies = pd.read_sql(query,conn)

#            data1 = data.iloc[:100]
            data1 = data
            cursor.close()
            conn.close()
            
        return render_template("mymovies.html",username=session["username"],all_movies=data1.values,my_movies= my_movies,len= len)
    else:
        return 

@app.route("/jquery/removeMovie",methods=["POST"])
def removeFromList():
    if request.method == "POST":
        if session["logged_in"]:
            username = session["username"]
            movieName = request.form["myData"]
            movieName = movieName[1:]
            conn = sqlite3.connect("MyFilmBox.db")

            cursor = conn.cursor()

            query = "delete from MyMovies where Username='"+username+"' and MovieName='"+movieName+"'"
                
            cursor.execute(query)    
            conn.commit()
        
            query = "select MovieName,MyPoint from MyMovies where Username='"+username+"'"
            my_movies = pd.read_sql(query,conn)

            data1 = data.iloc[:100]

            cursor.close()
            conn.close()
            
        return render_template("mymovies.html",username=session["username"],all_movies=data1.values,my_movies= my_movies,len=len)
    else:
        return

@app.route("/general_recommendation")
def recommend_movie():
    if session["logged_in"]:
        return render_template("general_recommendation.html",username=session["username"])
    else:
        return render_template("general_recommendation.html",username="not")

@app.route("/recommend",methods=["POST"])
def recommend():
    if request.method == "POST":
        movie_1 = request.form["f_movie"]
        movie_2 = request.form["s_movie"]
        movie_3 = request.form["t_movie"]

        
        for_first = rm.recommend_to_me(dataset[dataset["name"]==movie_1])
        for_second = rm.recommend_to_me(dataset[dataset["name"]==movie_2])
        for_third = rm.recommend_to_me(dataset[dataset["name"]==movie_3])

        data1 = []
        #data1 = data.iloc[:100]
        for each in for_first:
            data1.append(list(data[data["name"] == each].values[0]))

        for each in for_second:
            if not each in for_first:
                data1.append(list(data[data["name"] == each].values[0]))

        for each in for_third:
            if not each in for_first and not each in for_second:
                data1.append(list(data[data["name"] == each].values[0]))

        if session["logged_in"]:
                
            username = session["username"]
            
            con = sqlite3.connect('MyFilmBox.db')
            query = "select MovieName,MyPoint from MyMovies where Username='"+username+"'"
            my_movies = pd.read_sql(query,con)
            con.close()
                                        
            return render_template("recomm_result.html",username=session["username"],all_movies=data1,my_movies= my_movies,len=len)
        else:
            print(data1)
            return render_template("recomm_result.html",username="not",all_movies=data1)
    else:
        return

if __name__ == "__main__":
    app.run(debug = True)
