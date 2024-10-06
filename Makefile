SSH_DEST = dse@webonastick.com
REPOS_DIR = ~/git/dse.d/web-styletext
REPOS_URL = git@github.com:dse/web-styletext.git
SYMLINK = /www/webonastick.com/htdocs/styletext

DOCUMENT_ROOT = $(REPOS_DIR)

publish:
	ssh $(SSH_DEST) '\
		if [ -d $(REPOS_DIR) ] ; then \
			cd $(REPOS_DIR) && git pull ; \
		else \
			cd "$$(dirname $(REPOS_DIR))" && git clone $(REPOS_URL) ; \
		fi ; \
		ln -n -f -s $(DOCUMENT_ROOT) $(SYMLINK)'
