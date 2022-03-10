import json
import csv

def main () :
    count = 0
    with open ('videoList1.csv','r', encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            print(row)
            if count == 0:
                # 辞書のキーの部分
                field_name = row
                count += 1
            else:
                # ユニークなid
                id = row[1] + '-' + row[4]
                # youtubeの動画のId
                movie = row[1]
                # 歌手
                name = row[2]
                # 歌名
                title = row[3]
                # スタートの時間(s)
                start = 0
                s_time_list = row[4].split(':')
                for i in range(len(s_time_list)):
                    start += int(s_time_list[(-1*i)-1]) * (60**i)
                # 終わりの時間(s)
                end = 0
                e_time_list = row[5].split(':')
                for i in range(len(e_time_list)):
                    end += int(e_time_list[(-1*i)-1]) * (60**i)




if __name__ == '__main__':
    main()
