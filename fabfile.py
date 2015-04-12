from fabric.api import *
from fabric.colors import green, red
import datetime
import time
from shutil import copyfile
from fabric.contrib.project import rsync_project

env.host_string = '107.170.245.124'
env.user = 'root'
ts = time.time()
st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H-%M-%S')

def deploy():
    """This pshes to production"""
    with cd('/apps/sharejs-rethinkdb-example'):
        run('pwd')
        run('git stash')
        run('git pull -f origin master')
        run('fig -f prod.yml stop')
        run('fig -f prod.yml build')
        run('fig -f prod.yml up -d')

def restart():
    """This restart the server"""
    with cd('/apps/sharejs-rethinkdb-example'):
        run('fig -f prod.yml stop')
        run('fig -f prod.yml up -d')

# def push_db():
#     # Doesn't really work!
#     """Backup Data And Push DB"""
#     copyfile('./content/data/ghost.db', './content/data/ghost-' + str(st) + '-local.db.bak')
#     with cd('/apps/blog/content/data'):
#         get('ghost.db', './content/data/ghost-' + str(st) + '-remote.db.bak')
#         put('./content/data/ghost.db', './ghost.db')
#     with cd('/apps/blog'):
#         run('fig -f prod.yml stop')
#         run('fig -f prod.yml up -d')

# def pull_db():
#     # Doesn't really work!
#     """Backup Data And Pull DB"""
#     copyfile('./content/data/ghost.db', './content/data/ghost-' + str(st) + '-local.db.bak')
#     with cd('/apps/blog/content/data'):
#         get('ghost.db', './content/data/ghost-' + str(st) + '.db.bak')
#         get('ghost.db', './content/data/ghost.db')
#     with cd('/apps/blog'):
#         run('fig -f prod.yml stop')
#         run('fig -f prod.yml up -d')

def sync_config():
    """Sync Local and Remote Configurations"""
    rsync_project(remote_dir='/apps/sharejs-rethinkdb-example/config/', local_dir='./config/')
