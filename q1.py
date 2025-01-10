from abc import ABC,abstractmethod
from collections import defaultdict
balance_db={}
class Balance():
    global balance_db

    def add_transaction(self,userIdx,transaction: dict):
        user_in_transaction=list(transaction.keys())
        try:
            user_in_transaction.remove(userIdx)
        except:
            pass
        # print(transaction)
        if userIdx in balance_db:
            for user in user_in_transaction:
                # print(user,userIdx,balance_db)
                if user in balance_db[userIdx]:
                    balance_db[userIdx][user]+=transaction[user]
                    # if user in balance_db:
                    #     balance_db[user][userIdx]-=transaction[user]
                    # else:
                    #     balance_db[user][userIdx]=-transaction[user]
                else:
                    balance_db[userIdx][user]=transaction[user]
                    # if user in balance_db:
                    #     balance_db[user][userIdx]-=transaction[user]
                    # else:
                    #     balance_db[user][userIdx]=-transaction[user]
       
    
    def show_user_balance(self,userId):
        if userId not in balance_db:
           balance_db[userId]={}
        print(f"user expense report of {userId} is {balance_db[userId]}")
        return

    def show_all_balance(self):
        print(f"all balance is {balance_db}")
        return

class UserFactory(Balance):
    def __init__(self,userId, name, email, mobile_number):
        self.userId= userId
        self.name=name
        self.email=email
        self.mobile_number=mobile_number
        self.ledger={}

   

class Expense(Balance):
    def __init__(self,*args):
        self.expense_list=list(args)
        
    
    def extracting_transaction(self):
        self.mainUserId = self.expense_list[0]
        self.amount = self.expense_list[1]
        self.no_of_split = self.expense_list[2]
        self.user_involved = self.expense_list[3:3+self.no_of_split]
        
        self.current_balance={}
       
        if "EQUAL" in self.expense_list:
            expense_amount = (self.amount)/self.no_of_split
            for user in range(self.no_of_split):
                self.current_balance[self.user_involved[user]]=expense_amount
            # print("s",self.current_balance)
            self.add_transaction(self.mainUserId,self.current_balance)
        elif "EXACT" in self.expense_list:
            self.amount_list = self.expense_list[-self.no_of_split:]
            try :
                sum(self.amount_list)==self.amount
            except:
                raise ValueError
            for i in range(self.no_of_split):
                self.current_balance[self.user_involved[i]]=self.amount_list[i]
            self.add_transaction(self.mainUserId,self.current_balance)
        else:
            self.percentage_list = self.expense_list[-self.no_of_split:]
            try :
                sum(self.percentage_list)==100
            except:
                raise ValueError
            for i in range(self.no_of_split):
                self.current_balance[self.user_involved[i]] = (self.percentage_list[i]*self.amount)/100 
            self.add_transaction(self.mainUserId,self.current_balance)



Balance_db = Balance()
user1 = UserFactory("user1","name1",98,98)
user2 = UserFactory("user2","name2",98,98)
user3 = UserFactory("user3","name3",98,98)
user4 = UserFactory("user4","name4",98,98) 

Balance_db.show_user_balance("user1")
exp = Expense("user1",1000,4,"user1","user2","user3","user4","EQUAL")
exp.extracting_transaction()
Balance_db.show_user_balance("user4")
Balance_db.show_user_balance("user1")

exp2 = Expense("user1",1250,2,"user2","user3","EXACT",370,880)
exp2.extracting_transaction()
Balance_db.show_all_balance()

exp3 = Expense("user4",1200,4,"user1","user2","user3","user4","PERCENT",40,20,20,20)
exp3.extracting_transaction()

Balance_db.show_user_balance("user1")

Balance_db.show_all_balance()




# SHOW
# SHOW u1
# EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL
# SHOW u4
# SHOW u1
# EXPENSE u1 1250 2 u2 u3 EXACT 370 880
# SHOW
# EXPENSE u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20
# SHOW u1
# SHOW
