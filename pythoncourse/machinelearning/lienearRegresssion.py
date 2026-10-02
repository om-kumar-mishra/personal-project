# from scipy import stats
# import numpy as np
# import matplotlib.pyplot as plt
# x=[5,7,8,45,45,4,3,4,5,5,7,56,56,7,4]
# y=[5,74,8,45,45,4,33,4,54,5,74,56,56,74,4]
# slope, intercept , r,p ,std_err=stats.linregress(x,y)

# def myfunc(x):
#     return slope * x + intercept
# mymodel=list(map(myfunc,x))
# plt.scatter(x,y)
# plt.plot(x,mymodel)
# plt.show()

# Defining R for relationhip

from scipy import stats
import numpy as np
import matplotlib.pyplot as plt
x=[5,7,8,45,45,4,3,4,5,5,7,56,56,7,4]
y=[5,74,8,45,45,4,33,4,54,5,74,56,56,74,4]
slope, intercept , r,p ,std_err=stats.linregress(x,y)
print(r)

# def myfunc(x):
#     return slope * x + intercept
# mymodel=list(map(myfunc,x))
# plt.scatter(x,y)
# plt.plot(x,mymodel)
# plt.show()
