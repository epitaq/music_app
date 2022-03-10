import json
import csv

video_list = []
count = 0
title = []
with open ('videoList.csv','r') as f:
    reader = csv.reader(f)
    for row in reader:
        if count == 0:
            title = row
            count += 1
        else:
            count += 1
            video_dic = {title[i] : row[i] for i in range(len(title))}
            video_list.append(video_dic)
video_json = json.dumps({'contens':video_list}, indent=4)
    
print(video_json)
