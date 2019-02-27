import json
import csv
from ssk import schSSK

f = open('../standardsKB/standards.json')
data = json.load(f)
f.close()

entries = ("id", "standard_desc_fr", "standard_desc_deu", "standard_desc_esp", "standard_type", "standard_data_type", "standard_desc_ita", "standard_tags", "standard_resources", "_version_")

def entries_to_remove(entries, the_dict):
    for key in entries:
        if key in the_dict:
            del the_dict[key]

for dic in data:
    entries_to_remove(entries, dic)

keys = data[0].keys()

with open("standards.csv", 'w') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(data)