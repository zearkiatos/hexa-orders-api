docker-build:
	docker compose up --build

docker-dev:
	docker compose -f docker-compose.develop.yml up --build

docker-down:
	docker compose down
	docker compose -f docker-compose.develop.yml down