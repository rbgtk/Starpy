#!/usr/bin/python3

import os,sys,numpy,json
from PIL import Image

file  = sys.argv[1]
image = Image.open(file)

w, h   = image.size
pixels = image.load()
values = numpy.zeros((w, h))
target = float(sys.argv[2])

points = []

for x in range(w):
	for y in range(h):
		r,g,b,a  = pixels[x,y]
		values[x, y] = value = (r + g + b) * (a / 255) / (3 * 128)

		if value > target:
			points.append((x,y))

groups = []

for p in points:
	used = False

	for g in groups:
		if p in g:
			used = True
			break

	if used:
		continue

	d     = 4
	group = []
	group.append(p)

	for q in list(points):
		x1, y1 = p
		x2, y2 = q

		if x1 - d <= x2 <= x1 + d and y1 - d <= y2 <= y1 + d:
			group.append(q)

	group.sort()
	groups.append(group)

centers = []

for g in groups:
	avgx = avgy = 0

	for p in g:
		x, y = p
		avgx = avgx + x
		avgy = avgy + y

	avgx = avgx / len(g)
	avgy = avgy / len(g)

	centers.append({'x': int(avgx), 'y': int(avgy)})

output = open(sys.argv[1] + '.json', 'w')
output.write(json.dumps(centers))
output.close()
