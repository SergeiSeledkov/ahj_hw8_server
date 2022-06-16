const http = require("http");
const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const Router = require("koa-router");
const router = new Router();
const Controller = require("./Controller");
const controller = new Controller();
const PORT = process.env.PORT || 7070;
const server = http.createServer(app.callback());
const WS = require('ws');
const wsServer = new WS.Server({ server });

app.use(koaBody({ text: true, urlencoded: true, json: true, multipart: true }));

app.use(cors());

router.get('/allUser', async (ctx) => {
	if (ctx.request.method === 'GET') {
		ctx.response.body = controller.getAllUser();
		ctx.response.status = 200;
	} else {
		ctx.response.body = 'Method Not Allowed (Allow: GET)';
		ctx.response.status = 405;
	}
});

router.post('/newUser', async (ctx) => {
	const { name } = ctx.request.query;

	if (ctx.request.method === 'POST') {
		const addUser = controller.addNewUser(name);

		if (addUser !== 403) {
			ctx.response.body = addUser;
			ctx.response.status = 200;
		} else {
			ctx.response.body = 'User Already Exist';
			ctx.response.status = 403;
		}
	} else {
		ctx.response.body = 'Method Not Allowed (Allow: POST)';
		ctx.response.status = 405;
	}
});

router.delete('/deleteUser', async (ctx) => {
	const { id } = ctx.request.query;

	if (ctx.request.method === 'DELETE') {
		const deleteUser = controller.deleteUser(id);

		if (deleteUser !== 404) {
			ctx.response.body = deleteUser;
			ctx.response.status = 200;
		} else {
			ctx.response.body = 'User Not Found';
			ctx.response.status = 404;
		}
	} else {
		ctx.response.body = 'Method Not Allowed (Allow: DELETE)';
		ctx.response.status = 405;
	}
});

router.get('/allMessage', async (ctx) => {
	if (ctx.request.method === 'GET') {
		ctx.response.body = controller.getAllMessage();
		ctx.response.status = 200;
	} else {
		ctx.response.body = 'Method Not Allowed (Allow: GET)';
		ctx.response.status = 405;
	}
});

router.post('/newMessage', async (ctx) => {
	const { idUser, userName, message } = ctx.request.query;

	if (ctx.request.method === 'POST') {
		ctx.response.body = controller.addNewMessage(idUser, userName, message);
		ctx.response.status = 200;
	} else {
		ctx.response.body = 'Method Not Allowed (Allow: POST)';
		ctx.response.status = 405;
	}
});

app.use(router.routes());
app.use(router.allowedMethods());

wsServer.on('connection', (ws, req) => {
	ws.on('message', msg => {
		Array.from(wsServer.clients)
			.filter(o => o.readyState === WS.OPEN)
			.forEach(o => {
				o.send(msg + '');
			});
	});
});

server.listen(PORT, () => console.log(`server started on ${PORT}`));