import math
from itertools import permutations

dx1 = 27
dx2 = 36
dy1 = 36
dy2 = 78

## Python code for finding the least-distance travel-path when sweeping the lines on one side of a Hartru court.
## This is a modified traveling-salesman problem.  Below are descriptions of the lines.  All positions are 
## expressed in half-feet, relative to an origin at the middle of the baseline.  All lines point in positive
## direction (either x or y).
## 0: left-outside alley
## 1: left-inside alley
## 2: back of service line
## 3: bisector of service boxes
## 4: baseline
## 5: right-inside alley
## 6: right-outside alley

xy = (((-dx2,  0),(-dx2,dy2)), \
      ((-dx1,  0),(-dx1,dy1)), \
      ((-dx1,dy1),(-dx1,dy2)), \
      ((-dx1,dy1),(   0,dy1)), \
      ((   0,dy1),( dx1,dy1)), \
      ((   0,dy1),(   0,dy2)), \
      ((-dx2,  0),( dx2,  0)), \
      (( dx1,  0),( dx1,dy1)), \
      (( dx1,dy1),( dx1,dy2)), \
      (( dx2,  0),( dx2,dy2)))

lenmin = 999999
imin = []
nmin = []


for iline in range(0,len(xy)):
 imin.append(2)
 nmin.append(iline)

print('\n All distances/positions below are expressed in half-feet.')
print('Below are the successive minima of the "wasted distance" function, followed by the values of each of its ',len(xy)-1,' terms. \n')

perm = permutations(xy)
for lines in perm:
 for ntot in range(0,2**(len(xy)-1)):
  i = [0]
  n = ntot
  length = 0
  d = []
  for iline in range(1,len(xy)):
   i.append(int(n % 2))
   n -= i[iline]
   n /= 2
   xi = lines[iline-1][1-i[iline-1]][0]
   yi = lines[iline-1][1-i[iline-1]][1]
   xf = lines[iline][i[iline]][0]
   yf = lines[iline][i[iline]][1]
   d.append(math.sqrt((xi - xf)**2 + (yi - yf)**2))
   length += d[iline-1]
  if length<lenmin:
   lenmin=length
   for iline in range(len(xy)):
    imin[iline] = i[iline]
    nmin[iline] = lines[iline]
   print(length,d)

print('\n The smallest possible "wasted distance" is ',lenmin,',')
print('which is obtained by traversing the following sequence of coordinates.:\n')

for iline in range(len(xy)):
 print(nmin[iline][imin[iline]])
 print(nmin[iline][1 - imin[iline]])