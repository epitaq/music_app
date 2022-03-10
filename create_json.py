import json
import csv

def main () :
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
    # print(video_list)
    video_all = [video_list[i]['id'] for i in range(len(video_list))]
    print(video_all)
    video_list = {'contents':video_list, 'videoList':video_all}
    # JSONの作成＆保存
    video_json = json.dumps(video_list, indent=4)
    # print(video_json)
    fw = open('videoList.json','w')
    json.dump(video_list, fw, indent=4)
    print(video_json)

if __name__ == '__main__':
    main()
