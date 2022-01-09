
documentation:
	npx docsify serve ./docs

deploy-landing:
	sshpass -e rsync -av --delete ./landing/ \
		${RSYNC_USER}@${RSYNC_HOST}:${RSYNC_DIR}
