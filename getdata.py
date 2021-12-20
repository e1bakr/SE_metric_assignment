import os
from github import Github


token = os.getenv('GIT_USER')
g = Github(token)


def getBasicData(username):
    data = {}
    data["Username"] = username
    user = ""
    try:
        user = g.get_user(username) 
    except: 
        data["Username"] = "Not Found"
        return data
    data["Name"] = user.name
    data["Follower Count"] = user.followers
    data["Following Count"] = user.following
    repos = getRepos(user.get_repos(), username)
    data["Repo Count"] = len(repos) - 1
    data["Repositories"] = repos
    return data
    
def getRepos(repos, name):
    repolist = {}
    total=0
    for repo in repos:
        repolist[repo.full_name] = repo.watchers  
        total+=repo.watchers   
    repolist["total"] = total
    return repolist
    
