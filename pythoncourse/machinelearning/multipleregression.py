# multiregression
'''import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score

# Step 1: Create a synthetic dataset
data = {
    "Experience": [1, 3, 5, 7, 9, 11, 13, 15],
    "Education_Level": [2, 3, 3, 4, 4, 5, 5, 6],
    "Age": [22, 25, 28, 32, 36, 40, 45, 50],
    "Salary": [30, 50, 70, 85, 100, 130, 150, 180]  # Dependent variable
}

df = pd.DataFrame(data)
x = df[["Experience", "Education_Level", "Age"]]  
y = df["Salary"]  # Dependent variable

# Step 4: Fit the regression model
model = linear_model.LinearRegression()
model.fit(x , y)

# Step 5: Make predictions
y_pred = model.predict([[1,2,22]])
print(y_pred)


'''

# cofficient

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score

# Step 1: Create a synthetic dataset
data = {
    "Experience": [1, 3, 5, 7, 9, 11, 13, 15],
    "Education_Level": [2, 3, 3, 4, 4, 5, 5, 6],
    "Age": [22, 25, 28, 32, 36, 40, 45, 50],
    "Salary": [30, 50, 70, 85, 100, 130, 150, 180]  # Dependent variable
}

df = pd.DataFrame(data)
x = df[["Experience", "Education_Level", "Age"]]  
y = df["Salary"]  # Dependent variable

# Step 4: Fit the regression model
model = linear_model.LinearRegression()
model.fit(x , y)

print(model.coef_)

# if experiance increase its multiple

# Step 5: Make predictions
y_pred = model.predict([[1,2,22]])
print(y_pred)
y_pred = model.predict([[100,2,22]])
print(y_pred)