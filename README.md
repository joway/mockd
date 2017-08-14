# MockD

Mock Domains on localhost .

## Getting Started

### Installing

```
npm i -g mockd
```

### Usage

- edit ~/.mockd/proxy.json

	example:
			
		{
		"akc": "http://127.0.0.1:8002",
		"kd": "https://www.youdao.com"
		}

- edit /etc/hosts
		
		127.0.0.1 akc
		127.0.0.1 kd

- start server
	
	```
	sudo mockd # require root permission
	```

- when visited `akc` , you will be proxy to http://127.0.0.1:8002
	
	ps: if proxy.json file changed , you need to restart your mockd server
	
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


