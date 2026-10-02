# model ko test krna ki accuracy hai
'''
import numpy 
import matplotlib.pyplot as plt
numpy.random.seed(2)
sharad1=numpy.random.normal(3,1,100)
sharad2=numpy.random.normal(150,40,100)/sharad1

plt.scatter(sharad1,sharad2)
plt.show()
'''


'''
import numpy 
import matplotlib.pyplot as plt
numpy.random.seed(2)
x=numpy.random.normal(3,1,100)
y=numpy.random.normal(150,40,100)/x
train_x=x[:80]
train_y=y[:80]

test_x=x[80:]
test_y=y[80:]


plt.scatter(train_x,train_y)
plt.scatter(test_x,test_y)
plt.show()
'''

# what about fit data set.

'''
import numpy 
import matplotlib.pyplot as plt
numpy.random.seed(2)
x=numpy.random.normal(3,1,100)
y=numpy.random.normal(150,40,100)/x
train_x=x[:80]
train_y=y[:80]

test_x=x[80:]
test_y=y[80:]

mymodel=numpy.poly1d(numpy.polyfit(train_x , train_y,4))
myline=numpy.linspace(0,6,100)

plt.scatter(train_x,train_y)
plt.plot(myline,mymodel(myline))
# plt.scatter(test_x,test_y)
plt.show()

'''
# relationship straingth
'''
import numpy 
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

numpy.random.seed(2)
x=numpy.random.normal(3,1,100)
y=numpy.random.normal(150,40,100)/x
train_x=x[:80]
train_y=y[:80]

test_x=x[80:]
test_y=y[80:]

mymodel=numpy.poly1d(numpy.polyfit(train_x , train_y,4))

r2=r2_score(train_y,mymodel(train_x))
print(r2)'''

# now we will predict the values
#in thw below exam

import numpy 
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

numpy.random.seed(2)
x=numpy.random.normal(3,1,100)
y=numpy.random.normal(150,40,100)/x
train_x=x[:80]
train_y=y[:80]

test_x=x[80:]
test_y=y[80:]

mymodel=numpy.poly1d(numpy.polyfit(train_x , train_y,4))

print(mymodel(5))