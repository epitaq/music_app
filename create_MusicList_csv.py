# 分を秒に変換
import csv
print('csvのpathを入力')
csv_name = input()
music_list = []
with open(csv_name, 'r') as f:
    data = csv.reader(f)
    for i in data:
        if i[0] == 'id':
            pass
        else:
            # スタートを秒数に変換
            start = 0
            start_list = i[4].split(':')
            for n in range(len(start_list)):
                start += int(start_list[(-1*n)-1]) * (60**n)
            i[4] = start
            # エンドを秒数に変換
            end = 0
            end_list = i[5].split(':')
            for n in range(len(end_list)):
                end += int(end_list[(-1*n)-1]) * (60**n)
            i[5] = end
            #
        # print(i)
        music_list.append(i)

# エクスポート
with open(csv_name, 'w') as f:
    writer = csv.writer(f)
    writer.writerows(music_list)





