import json
import csv

def main () :
    count = 0
    videoList = []
    with open ('videoList3.csv','r', encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            print(row)
            if count == 0:
                # 辞書のキーの部分
                field_name = row
                count += 1
            else:
                movie_data = []
                # ユニークなid
                id = row[1] + '-' + row[4]
                movie_data.append(id)
                # youtubeの動画のId
                movie = row[1]
                movie_data.append(movie)
                # 歌手
                name = row[2]
                movie_data.append(name)
                # 歌名
                title = row[3]
                movie_data.append(title)
                # スタートの時間(s)
                start = 0
                s_time_list = row[4].split(':')
                for i in range(len(s_time_list)):
                    start += int(s_time_list[(-1*i)-1]) * (60**i)
                movie_data.append(start)
                # 終わりの時間(s)
                end = 0
                e_time_list = row[5].split(':')
                for i in range(len(e_time_list)):
                    end += int(e_time_list[(-1*i)-1]) * (60**i)
                movie_data.append(end)
                # 辞書の作成
                each_dictionary = {field_name[i]:movie_data[i] for i in range(len(field_name))}
                videoList.append(each_dictionary)
    videoList = {'content':videoList}
    videoList_dump = json.dumps(videoList, indent=4, ensure_ascii=False)
    print(videoList_dump)
    # 保存
    fw = open('videoList3.json','w')
    json.dump(videoList, fw, indent=4, ensure_ascii=False)





if __name__ == '__main__':
    main()
