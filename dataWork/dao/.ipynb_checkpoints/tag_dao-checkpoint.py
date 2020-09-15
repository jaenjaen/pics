{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pymysql\n",
    "import pandas as pd\n",
    "\n",
    "#DB 에서 Studio, Tag 정보 가져오기\n",
    "def getTagData() :\n",
    "    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',\n",
    "                         port=3306,\n",
    "                         user='pics',\n",
    "                         passwd='picspics!1',\n",
    "                         db='pics',\n",
    "                         charset='utf8',\n",
    "                       cursorclass=pymysql.cursors.DictCursor)\n",
    "    cursor= db.cursor()\n",
    "    sql =\"\"\"\n",
    "        SELECT \n",
    "        s.stu_id,s.com_id,s.category_id,s.name,s.description,s.rule,s.main_img,s.port_img,s.cad_img,s.floor,\n",
    "        t.tag_id, t.tag_name, t.stu_id \n",
    "        FROM studio s \n",
    "        LEFT JOIN tag t ON t.stu_id=s.stu_id\n",
    "        \"\"\"\n",
    "    \n",
    "    cursor.execute(sql)\n",
    "    db.commit()\n",
    "\n",
    "    result = cursor.fetchall()\n",
    "    db.close()\n",
    "    df = pd.DataFrame(result)\n",
    "    return df"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "!jupyter nbconvert --to script getTagData.ipynb "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.7"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
