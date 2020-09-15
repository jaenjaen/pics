
import pymysql
import pandas as pd

#DB 접근
def getTagData() :
    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
                         port=3306,
                         user='pics',
                         passwd='picspics!1',
                         db='pics',
                         charset='utf8',
                       cursorclass=pymysql.cursors.DictCursor)
    cursor= db.cursor()
    sql ="""
            SELECT 
            s.stu_id,s.com_id,s.category_id,s.name,s.description,s.rule,s.main_img,s.port_img,s.cad_img,s.floor,
            t.tag_id, t.tag_name, t.stu_id 
            FROM studio s 
            LEFT JOIN tag t ON t.stu_id=s.stu_id
        """

    cursor.execute(sql)
    db.commit()

    result = cursor.fetchall()
    db.close()
    df = pd.DataFrame(result)
    return df


# In[6]:


get_ipython().system('jupyter nbconvert --to script tag_dao.ipynb ')
