import pandas as pd
import numpy as np
from scipy.optimize import minimize
from math import log, factorial, exp

# data frame
matches = pd.read_csv('./data/spi_matches.csv')
matches = matches.dropna(subset=['score1']) # dropping unplayed 
matches = matches[matches.spi1 > 40]
matches = matches[matches.league_id == 2411] # PL

clubs = pd.read_csv('./data/spi_global_rankings.csv')
clubs.set_index('name')


def minusloglik(x0):
    rate = x0[0]
    rate_h = x0[1]
    beta = x0[2]
    
    out = 0
    
    for i in range(len(matches)):
        try:
            lam1 = (rate+rate_h)*exp(beta*(matches['spi1'][i]/matches['spi2'][i]))
            goals1 = matches['score1'][i]
        
            lam2 = (rate)*exp(beta*(matches['spi2'][i]/matches['spi1'][i]))
            goals2 = matches['score2'][i]
            if lam1 < 0: # optim routine tries invalid values
                lam1 = 1
            if lam2 < 0:
                lam2 = 1
            out += goals1*log(lam1) - lam1 - log(factorial(goals1))
            out += goals2*log(lam2) - lam2 - log(factorial(goals2))
        except: # a few of the rows raises an error
            print(i)
            pass
    return out


def loglik(x0):
    return -minusloglik(x0)

x0 = np.array([0.3, 0.1, 1.2])
res = minimize(loglik, x0) # 0.3811, 0.1261, 1.0718
  
print(res)
