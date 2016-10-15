#!/bin/bash
for f in *.STA
do
    python3 ../parser/convertToJSON.py "$f" "${f/.STA/.json}"
done
