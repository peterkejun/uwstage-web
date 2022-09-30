init: 
	./bin/init.sh
	$(MAKE) build_modules

build_modules:
	docker-compose run web yarn install

up:
	docker-compose up

down:
	docker-compose down
