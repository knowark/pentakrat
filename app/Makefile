.PHONY: all tests coverage

install:
	npm install

coverage:
	npm run test

coverage-application:
	npm run test-application

coverage-watch:
	npm run test-watch

dev:
	npm run dev

clear:
	rm -rf ./dist

build:
	npm run build

standard:
	npx standard --fix

push:
	git push && git push --tags

deploy: build
	sshpass -e rsync -av --delete ./dist/ \
		${RSYNC_USER}@${RSYNC_HOST}:${RSYNC_DIR}/app

reset:
	git reset --hard
	git clean -xdf

purge:
	rm -rf ./node_modules
	npm cache clean --force

http:
	http-server -p 8084 -c-1 dist

browser-sync:
	browser-sync start --proxy "localhost:8084" --files "*" --https

inotifyWatchesLimit:
	sudo sysctl fs.inotify.max_user_watches=524288
	sudo sysctl -p --system

gitmessage:
	touch .gitmessage
	echo "\n# commit message\n.gitmessage" >> .gitignore
	git config commit.template .gitmessage
