docker-build:
	docker compose up --build

docker-dev:
	docker compose -f docker-compose.develop.yml up --build -d
	make docker-dev-mysql

docker-down:
	docker compose down
	docker compose -f docker-compose.develop.yml down

test-env-up:
	docker compose -f docker-compose.test.yml up --build -d ; make docker-dev-mysql

test-env-down:
	docker compose -f docker-compose.test.yml down

docker-dev-mysql:
	sleep 15
	docker exec -t mysql sh /docker/mysql-entrypoint.sh -d