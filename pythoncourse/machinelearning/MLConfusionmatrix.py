'''import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

confusion_matrix=metrics.confusion_matrix(actual,predicted)
cm_display=metrics.ConfusionMatrixDisplay(confusion_matrix=confusion_matrix,display_labels=[False,True])
cm_display.plot()
plt.show()'''

# accuracy score
'''
import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

accuracy=metrics.accuracy_score(actual,predicted)
print(accuracy)

'''

# Precision : of the postive predicted ,what is the percentag or truly positive
'''
import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

precision=metrics.precision_score(actual,predicted)

print(precision)

'''

# sensitivity (Recall): of all the  positivitycases , what is the percentage of postive prediction
'''
import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

senseRecall=metrics.recall_score(actual,predicted)

print(senseRecall)

'''
# kitna negativity hai ye check krna uppar sb postvivity ko check kr rhe the

# Specificity
'''
import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

specify=metrics.recall_score(actual,predicted,pos_label=0)

print(specify)

'''
# F-score isme postivie or negative dono value hoti hai 
'''
import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

f1_score=metrics.f1_score(actual,predicted,pos_label=0)

print(f1_score)

'''

# How to use all of them is a single code:

import numpy
import matplotlib.pyplot as plt
from sklearn import metrics

actual=numpy.random.binomial(1,0.9,size=1000)
predicted=numpy.random.binomial(1,.9,size=1000)

accuracy=metrics.accuracy_score(actual,predicted)
precision=metrics.precision_score(actual,predicted)
senseRecall=metrics.recall_score(actual,predicted)


specify=metrics.recall_score(actual,predicted,pos_label=0)
f1_score=metrics.f1_score(actual,predicted,pos_label=0)


print({"Acurracy":accuracy,"precision":precision,"senseRecall":senseRecall,"specify":specify,"f1_score":f1_score})


