
serve-docs:
	npx docsify serve ./docs

serve-landing:
	npx browser-sync start -s -w

deploy-landing:
	sshpass -e rsync -av --delete ./landing/ \
		${RSYNC_USER}@${RSYNC_HOST}:${RSYNC_DIR}

deploy-docs:
	sshpass -e rsync -av --delete ./landing/ \
		${RSYNC_USER}@${RSYNC_HOST}:${RSYNC_DIR}
