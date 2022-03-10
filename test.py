import json
import csv

video_list = []
with open ('videoList.csv','r') as f:
    reader = csv.reader(f)
    for i in reader:
        video_list.append(i)
    
print(video_list)

video_dic_lst = []
video_dic = {}
for num in range(len(video_list)):
    if num != 0:
        lst = video_list[num]
        video_dic_lst.append({video_list[0][i]:lst[i] for i in range(len(video_list[0]))})

video_dic = {'contens':video_dic_lst}
print(video_dic)
video_json = json.dumps(video_dic, indent=4)
print(video_json)