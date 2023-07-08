import pandas as pd
import time

def recommend_to_me(sample1, knn_k = 5):

    data = pd.read_csv("IMDB.csv",encoding = "latin")

#    columns =['company', 'country', 'director', 'genre', 'name',
 #                 'runtime', 'score', 'star', 'writer', 'year']

    unused_columns = ["budget","gross","released","votes","rating"]

    data.drop(columns = unused_columns, axis = 1, inplace = True)
    sample1.drop(columns = unused_columns, axis = 1, inplace = True)
    sample = sample1.values[0]
    
    closest = []
    t1 = time.time()

    for val in data.values:
        dist = 0
        i = 0
        while i < len(val):
            if i!=5 and i!=6:
                if val[i] != sample[i]:
                    dist += 1
            else:
                dist += int(abs(sample[i]-val[i]))
            i += 1

        state = [dist,val]
        closest.append(state)

    names = []
    print("")
    print("Recommendations---->")
    print("--------------------")

    for i in range(knn_k):
        min = 100000000000000000000000000000000 
        j = 0
        k = 0
        while j < (len(closest)):
            if min > closest[j][0]:
                min = closest[j][0]
                k = j
            j += 1

        names.append(closest.pop(k)[1][4])
        print(names[i])
    t2 = time.time()

    print("--------------------")
    print("Time-->",(t2-t1))
    print("--------------------")

    return names

#list1 = recommend_to_me(5)
