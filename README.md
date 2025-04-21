# Проект "Test Project"

## Описание проекта

Frontend:
- Реализован на основе фреймворка React с использованием TypeScript.

Backend:
- Реализован с использованием Hasura, который является GraphQL API сервером на основе PostgreSQL.

---

## Структура проекта

```plaintext
Frontend

frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── context/
│   │   ├── router/
│   │   ├── store/
│   │   └── App.tsx
│   ├── entities/
│   │   ├── Task/
│   │   └── index.ts
│   ├── features/
│   │   ├── DeleteLabel/
│   │   ├── LabelsList/
│   │   └── index.ts
│   ├── pages/
│   │   └── ListTasks/
│   └── widgets/
│       ├── CreateMark/
│       ├── CreateTask/
│       ├── CreateUser/
│       ├── Header/
│       ├── ListTasks/
│       ├── SearchTask/
│       ├── UpdateTask/
│       └── index.ts
├── main.tsx

Backend

test-task/
├── hasura/
│   ├── metadata/
│   ├── migrations/
│   └── config.yaml
├── docker-compose.yaml

    
Для запуска проекта необходимо сделать следующие шаги:
1. Убедитесь что у вас установлены следующие инструменты: Git, Node.js, npm, Docker & Docker Compose;
2. Написать команду git clone https://github.com/qweasdzxcll/test-project.git;
3. Открыть проект;
4. Написать команду cd frontend/;
5. Написать команду npm i;
6. Открыть второй терминал и написать команду cd test-task/;
7. Запустить docker командой docker-compose up -d;
8. Вернуться в первый терминал и запустить react-приложение командой npm run dev;

Для завершения проекта необходимо прекратить работу docker командой docker-compose down;