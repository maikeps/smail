trafficVolume = {
	"ll": 50,
	"lr": 50,
	"rl": 50,
	"rr": 50
}

generalConfig = {
	"simulation_duration": 30,
	"count_server_l": 1,
	"count_server_r": 1
}

tec = {
	"tec_local_fparam_1": 0.5,
	"tec_remote_fparam_1": 0.6
}

tserv = {
	"lls": {"lls_reception": 0.12, "tserv_lls_ftype": "constant", "tserv_lls_fparam_1": 1.3, "tserv_lls_fparam_2": 0, "tserv_lls_fparam_3": 0},
	"llf": {"llf_reception": 0.14, "tserv_llf_ftype": "constant", "tserv_llf_fparam_1": 1.3, "tserv_llf_fparam_2": 0, "tserv_llf_fparam_3": 0},
	"lla": {"lla_reception": 0.11, "tserv_lla_ftype": "constant", "tserv_lla_fparam_1": 1.3, "tserv_lla_fparam_2": 0, "tserv_lla_fparam_3": 0},
	
	"lrs": {"lrs_reception": 0.12, "tserv_lrs_ftype": "constant", "tserv_lrs_fparam_1": 1.3, "tserv_lrs_fparam_2": 0, "tserv_lrs_fparam_3": 0},
	"lrf": {"lrf_reception": 0.13, "tserv_lrf_ftype": "constant", "tserv_lrf_fparam_1": 1.3, "tserv_lrf_fparam_2": 0, "tserv_lrf_fparam_3": 0},
	"lra": {"lra_reception": 0.15, "tserv_lra_ftype": "constant", "tserv_lra_fparam_1": 1.3, "tserv_lra_fparam_2": 0, "tserv_lra_fparam_3": 0},
	
	"rls": {"rls_reception": 0.12, "tserv_rls_ftype": "constant", "tserv_rls_fparam_1": 1.3, "tserv_rls_fparam_2": 0, "tserv_rls_fparam_3": 0},
	"rlf": {"rlf_reception": 0.14, "tserv_rlf_ftype": "constant", "tserv_rlf_fparam_1": 1.3, "tserv_rlf_fparam_2": 0, "tserv_rlf_fparam_3": 0},
	"rla": {"rla_reception": 0.11, "tserv_rla_ftype": "constant", "tserv_rla_fparam_1": 1.3, "tserv_rla_fparam_2": 0, "tserv_rla_fparam_3": 0},
	
	"rrs": {"rrs_reception": 0.16, "tserv_rrs_ftype": "constant", "tserv_rrs_fparam_1": 1.3, "tserv_rrs_fparam_2": 0, "tserv_rrs_fparam_3": 0},
	"rrf": {"rrf_reception": 0.13, "tserv_rrf_ftype": "constant", "tserv_rrf_fparam_1": 1.3, "tserv_rrf_fparam_2": 0, "tserv_rrf_fparam_3": 0},
	"rra": {"rra_reception": 0.16, "tserv_rra_ftype": "constant", "tserv_rra_fparam_1": 1.3, "tserv_rra_fparam_2": 0, "tserv_rra_fparam_3": 0}
}

functionInfo = {
	"constant": 1,
	"normal": 2,
	"triangular": 3,
	"uniform": 2,
	"exponential": 1
}

prob = {
	"ll": {"ll_success": 87, "ll_failure": 0.5, "ll_delay": 12.5},
	"lr": {"lr_success": 96, "lr_failure": 1.5, "lr_delay": 2.5},
	"rl": {"rl_success": 96, "rl_failure": 3, "rl_delay": 1},
	"rr": {"rr_success": 90, "rr_failure": 1, "rr_delay": 9}
}

var status = "STOPPED"

function toggleSettings() {
	style = document.getElementById('settings').style

	if(style.visibility == "hidden") {
		style.visibility = "visible"
	} else {
		style.visibility = "hidden"
	}
}

function enableFields() {
	for(key in tserv){
		str = "tserv_" + key

		id = str + '_ftype'

		idparam1 = str + '_fparam_1'
		idparam2 = str + '_fparam_2'
		idparam3 = str + '_fparam_3'

		tservType = document.getElementById(id).value

		document.getElementById(idparam1).disabled = true
		document.getElementById(idparam2).disabled = true
		document.getElementById(idparam3).disabled = true

		switch (tservType) {
			case "constant":
				document.getElementById(idparam1).disabled = false
				break
			case "normal":
				document.getElementById(idparam1).disabled = false
				document.getElementById(idparam2).disabled = false
				break
			case "uniform":
				document.getElementById(idparam1).disabled = false
				document.getElementById(idparam2).disabled = false
				break
			case "triangular":
				document.getElementById(idparam1).disabled = false
				document.getElementById(idparam2).disabled = false
				document.getElementById(idparam3).disabled = false
				break
			default:
				break
		}
	}
}

function saveSettings() {
	document.getElementById('settings').style.visibility = "hidden"

	for(key in trafficVolume) {
		trafficVolume[key] = document.getElementById(key).value*1		
	}

	for(key in generalConfig) {
		generalConfig[key] = document.getElementById(key).value*1
	}

	for(key in tec) {
		tec[key] = document.getElementById(key).value*1		
	}

	for(key in tserv) {
		for(key2 in tserv[key]) {
	 		tserv[key][key2] = document.getElementById(key2).value
		}
	}

	for(key in prob) {
		for(key2 in prob[key]) {
			prob[key][key2] = document.getElementById(key2).value*1
		}
	}

	document.getElementById("msg_count_local").innerHTML = "0"
	document.getElementById("msg_count_remote").innerHTML = "0"
	document.getElementById("msg_capacity_local").innerHTML = generalConfig["count_server_l"]
	document.getElementById("msg_capacity_remote").innerHTML = generalConfig["count_server_r"]

	simulation.duration = generalConfig["simulation_duration"]

	simulation.reset()
}

function setHTMLDefaultValues() {
 	for(key in trafficVolume) {
 		document.getElementById(key).value = trafficVolume[key]
	}

	for(key in generalConfig) {
 		document.getElementById(key).value = generalConfig[key]
	}

	for(key in tec) {
 		document.getElementById(key).value = tec[key]
	}
	
	for(key in tserv) {
		for(key2 in tserv[key]) {
	 		document.getElementById(key2).value = tserv[key][key2]
		}
	}

	for(key in prob) {
		for(key2 in prob[key]) {
	 		document.getElementById(key2).value = prob[key][key2]
		}
	}

	document.getElementById("msg_count_local").innerHTML = "0"
	document.getElementById("msg_count_remote").innerHTML = "0"
	document.getElementById("msg_capacity_local").innerHTML = generalConfig["count_server_l"]
	document.getElementById("msg_capacity_remote").innerHTML = generalConfig["count_server_r"]

	enableFields()
}

function Simulation() {

	this.reset = function() {
		this.messageCount = 0
		this.leaveCount = 0
		this.messageId = 1

		this.timer = new Timer()
		this.duration = generalConfig["simulation_duration"]

		this.rng = new RNG()
		this.localFactory = new MessageFactory(this.rng.exponential, tec["tec_local_fparam_1"])
		this.remoteFactory = new MessageFactory(this.rng.exponential, tec["tec_remote_fparam_1"])

		this.receptionCenter = new ReceptionCenter()

		this.eventQueue = new SortedArray([], null, function (a, b) {
			return a.startTime - b.startTime
		})

		this.serviceCenterL = new ServiceCenter(generalConfig["count_server_l"])
		this.serviceCenterR = new ServiceCenter(generalConfig["count_server_r"])

		l = this.localFactory.getNextMessage(this.messageId)
		this.messageId++
		r = this.remoteFactory.getNextMessage(this.messageId)

		this.eventQueue.push(new MessageGenerationEvent(l.creationTime, this.eventQueue, l))
		this.eventQueue.push(new MessageGenerationEvent(r.creationTime, this.eventQueue, r))

	}

	this.reset()
	
	this.run = function() {
		this.timeout = setInterval(function() { simulation.step() }, 10)
	}

	this.pause = function() {
		clearInterval(this.timeout)
	}

	this.stop = function() {
		clearInterval(this.timeout)
		this.reset()
	}

	this.step = function() {
		nextEvent = this.eventQueue.shift()
		if(nextEvent == undefined){
			clearInterval(this.timeout)
		} else {
			this.timer.set(nextEvent.startTime)
			this.updateWindow()
			nextEvent.run()
		}
	}

	this.updateWindow = function() {
		// Atualiza o timer
		document.getElementById("timer").innerHTML = this.timer.currentTime
	}

	this.log = function(logMessage) {
		document.getElementById("log_box").innerHTML = logMessage + "<p/>" + document.getElementById("log_box").innerHTML
	}
}

function ServiceCenter(capacity) {
	this.occupiedServers = 0
	this.queue = new Array()
	this.capacity = capacity
	this.messageCount = 0

	this.pushToQueue = function(event) {
		this.queue.push(event)
	}

	this.removeFromQueue = function() {
		event = this.queue.shift()
		return event
	}
}

function Timer() {
	this.currentTime = 0

	this.set = function(time) {
		this.currentTime = time
	}
}

function RNG() {
	this.normal = function(a, b) {
		//TODO
	}

	this.exponential = function(a) {
		return -a * (Math.log(1 - Math.random()))
	}

	this.constant = function(a) {
		return a
	}

	this.triangular = function(a, b, c) {
		//TODO
	}

	this.uniform = function(a, b) {
		return Math.floor(Math.random() * b) + a
	}
}

function MessageGenerationEvent(startTime, eventQueue, message) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message

	this.run = function() {
		if(simulation.timer.currentTime < generalConfig["simulation_duration"]*1) {
			simulation.log(startTime + ": Mensagem " + this.message.id + " criada.")

			this.eventQueue.push(new EnterReceptionCenterEvent(this.startTime, this.eventQueue, this.message))

			simulation.messageCount++
			simulation.messageId++
			if(message.type[0] == "l") {
				l = simulation.localFactory.getNextMessage(simulation.messageId)	
				this.eventQueue.push(new MessageGenerationEvent(l.creationTime, this.eventQueue, l))
			} else {
				r = simulation.remoteFactory.getNextMessage(simulation.messageId)
				this.eventQueue.push(new MessageGenerationEvent(r.creationTime, this.eventQueue, r))
			}


			document.getElementById("system_total").innerHTML = simulation.messageCount - simulation.leaveCount
		} 
	}
}

function EnterReceptionCenterEvent(startTime, eventQueue, message) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " chegou no centro de recepção.")

		p = prob[message.type]
		r = Math.random() * 100
		if(r < p[message.type+"_success"]) {
			message.type += "s"
		} else if (r < p[message.type+"_failure"]) {
			message.type += "f"
		} else {
			message.type += "a"
		}

		delay = tserv[message.type][message.type+"_reception"]

		this.eventQueue.push(new LeaveReceptionCenterEvent(this.startTime + delay*1, this.eventQueue, this.message))
	}
}

function LeaveReceptionCenterEvent(startTime, eventQueue, message) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " saiu do centro de recepção.")

		if(this.message.type[1] == "r") {
			this.eventQueue.push(new EnterServiceCenterEvent(this.startTime, this.eventQueue, this.message, simulation.serviceCenterR))
			simulation.serviceCenterR.messageCount++
			document.getElementById("total_message_remote").innerHTML = simulation.serviceCenterR.messageCount
		} else {
			this.eventQueue.push(new EnterServiceCenterEvent(this.startTime, this.eventQueue, this.message, simulation.serviceCenterL))
			simulation.serviceCenterL.messageCount++
			document.getElementById("total_message_local").innerHTML = simulation.serviceCenterL.messageCount
		}
	}
}

function EnterServiceCenterEvent(startTime, eventQueue, message, serviceCenter) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message
	this.serviceCenter = serviceCenter

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " chegou no centro de serviço " + ((message.type[1] == "l") ? "local." : "remoto."))

		acquireEvent = new AcquireServiceCenterServerEvent(this.startTime, this.eventQueue, this.message, this.serviceCenter)
		if(this.serviceCenter.occupiedServers < this.serviceCenter.capacity) {
			

			// htmlElementId = (message.type[1] == "l") ? "msg_count_local" : "msg_count_remote"
			// document.getElementById(htmlElementId).innerHTML = this.serviceCenter.occupiedServers

			this.eventQueue.push(acquireEvent)
		} else {
			this.serviceCenter.pushToQueue(acquireEvent)
			simulation.log(startTime + ": Mensagem " + this.message.id + " entrou na fila do centro de serviço " + ((message.type[1] == "l") ? "local." : "remoto."))	
			htmlElementId = (message.type[1] == "l") ? "local_queue_size" : "remote_queue_size"
			document.getElementById(htmlElementId).innerHTML = this.serviceCenter.queue.length
		}
	}
}

function AcquireServiceCenterServerEvent(startTime, eventQueue, message, serviceCenter) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message
	this.serviceCenter = serviceCenter

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " começou a ser atendida pelo servidor do centro de serviço " + ((message.type[1] == "l") ? "local." : "remoto."))
		this.serviceCenter.occupiedServers++
		htmlElementId = (message.type[1] == "l") ? "msg_count_local" : "msg_count_remote"
		document.getElementById(htmlElementId).innerHTML = this.serviceCenter.occupiedServers

		
		functionType = tserv[message.type]["tserv_" + message.type + "_ftype"]
		args = [tserv[message.type]["tserv_" + message.type + "_fparam_1"]]
		if(functionInfo[functionType] == 2) {
			args.append(tserv[message.type]["tserv_" + message.type + "_fparam_2"])
		} else if(functionInfo[functionType] == 3) {
			args.append(tserv[message.type]["tserv_" + message.type + "_fparam_2"])
			args.append(tserv[message.type]["tserv_" + message.type + "_fparam_3"])
		}

		delay = simulation.rng[functionType].apply(this, args)

		this.eventQueue.push(new LeaveServiceCenterEvent(this.startTime + delay*1, this.eventQueue, this.message, this.serviceCenter))
	}
}

function LeaveServiceCenterEvent(startTime, eventQueue, message, serviceCenter) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message
	this.serviceCenter = serviceCenter

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " saiu do centro de serviço " + ((message.type[1] == "l") ? "local." : "remoto."))

		if(this.message.type[2] == "a")	{
			// recalcula se continua sendo a
			p = prob[this.message.type[0]+this.message.type[1]]
			r = Math.random() * 100
	
			if(r < p[this.message.type[0]+this.message.type[1]+"_success"]*1) {
				this.message.type = this.message.type[0]+this.message.type[1] + "s"
			} else if (r < p[this.message.type[0]+this.message.type[1]+"_failure"]*1) {
				this.message.type = this.message.type[0]+this.message.type[1] + "f"
			} else {
				this.message.type = this.message.type[0]+this.message.type[1] + "a"
			}
			this.eventQueue.push(new EnterServiceCenterEvent(this.startTime, this.eventQueue, this.message, this.serviceCenter))
		} else {
			// atualiza estatisticas
			// ...
			this.eventQueue.push(new MessageDisposalEvent(this.startTime, this.eventQueue, this.message))
		}


		this.serviceCenter.occupiedServers--
		
		htmlElementId = (message.type[1] == "l") ? "msg_count_local" : "msg_count_remote"
		document.getElementById(htmlElementId).innerHTML = this.serviceCenter.occupiedServers
		
		if(this.serviceCenter.queue.length > 0) {
			nextEvent = this.serviceCenter.removeFromQueue()
			nextEvent.startTime = this.startTime
			this.eventQueue.push(nextEvent)
			
			htmlElementId = (message.type[1] == "l") ? "local_queue_size" : "remote_queue_size"
			document.getElementById(htmlElementId).innerHTML = this.serviceCenter.queue.length
		}
	}
}

function MessageDisposalEvent(startTime, eventQueue, message) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " saiu do sistema.")
		simulation.leaveCount++

		document.getElementById("system_total").innerHTML = simulation.messageCount - simulation.leaveCount
		// ...
	}
}

function Message(creationTime, type, id) {
	this.id = id
	this.creationTime = creationTime
	this.type = type
}

function MessageFactory(generatorFunction, type) {
	this.lastCreation = 0
	this.generatorFunction = generatorFunction
	this.type = type


	this.getNextMessage = function(nextId) {
		if(this.type == "l") {
			creationTime = this.generatorFunction(tec["tec_local_fparam_1"]) + this.lastCreation
			messageType = (Math.random() * 100 < trafficVolume["ll"]) ? "ll" : "lr"
			this.lastCreation = creationTime
			return new Message(creationTime, messageType, nextId)
		} else {
			creationTime = this.generatorFunction(tec["tec_remote_fparam_1"]) + this.lastCreation
			messageType = (Math.random() * 100 < trafficVolume["rl"]) ? "rl" : "rr"
			this.lastCreation = creationTime
			return new Message(creationTime, messageType, nextId)
		}
	}
}

function ReceptionCenter() {

	this.receive = function(message) {

	}

	this.run = function(message) {
		this.seize()
		this.delay()
		this.release()
	}

	this.log = function() {

	}
}
