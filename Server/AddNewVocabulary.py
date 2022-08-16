import json

def readXmlFile(file: str):
    with open(file, 'r', encoding='utf8') as f:
        data = json.load(f)
    return data

def writeXmlFile(file: str, data: dict):
    data_string = json.dumps(data, indent=4, ensure_ascii=False).encode('utf8')
    jsonFile = open(file, "w", encoding='utf8')
    jsonFile.write(data_string.decode())
    jsonFile.close()

if __name__ == '__main__':

    while True:
        data = readXmlFile('vocabulary.json')
        print('\nNhập từ vựng mới.')
        print('Tiếng việt: ', end='')
        voc_vn = input().lower().strip()
        print('Tiếng anh: ', end='')
        voc_eng = input().lower().strip()

        if data.get(voc_vn) == None:
            data[voc_vn] = [voc_eng]
            writeXmlFile('vocabulary.json', data)
            print('Thêm thành công!!!')
        else:
            if voc_eng in data[voc_vn]:
                print('Từ vựng đã tồn tại')
            else:
                data[voc_vn].append(voc_eng)
                writeXmlFile('vocabulary.json', data)
                print('Thêm thành công!!!')