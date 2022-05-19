# csv,jsonを読み込むスクリプト
# 主にタグ付けを目的にしている
# tagとcsv_pathに入力


# 読み込みの準備
import sys
import os
import django
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()

from musicapp.models import *
import csv
import json


# 追加するタグをリスト型で保存
tag = ['ホロライブ','切り抜き']
# 追加するcsvのpathのリスト
data_paths = ['data/hrpubiRwB-k.json']


for data_path in data_paths:
    # 現在登録されているタグ
    c_tag = [str(Tag.objects.all()[i]) for i in range(len(Tag.objects.all()))]
    # 現在登録されていないtagを追加+確認
    for i in tag:
        if i in c_tag:
            pass
        else:
            Tag.objects.create(type=i)
    # dbに登録
    with open (data_path, 'r') as f:
        if data_path.count('.csv') > 0:
            reader = csv.reader(f)
            for i in reader:
                print(i[3])
                new = MusicList.objects.create(movie=i[1], name=i[2], title=i[3], start=i[4], end=i[5])
                new.save()
                for t in tag:
                    new.keeping.add(Tag.objects.get(type=t))
        elif data_path.count('.json') > 0:
            reader = json.load(f)
            for i in reader:
                print(i['title'])
                new = MusicList.objects.create(movie=i['movie'], name=i['name'], title=i['title'], start=i['start'], end=i['end'])
                new.save()
                for t in tag:
                    new.keeping.add(Tag.objects.get(type=t))


