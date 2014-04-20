from recommender.managers import RecommenderManager as RM
from csusers.models import CSUser as User
from videos.models import Site, Video, Sitemap

def load(r): 
    d = {"rm":RM,"user":User,"video":Video}
    return d[r]
    
def init():
    u = load("user")
    rm = RM()
    v = load("video")
    return [u,v,rm]

# import shell
# u, v, rm = shell.init()
    
