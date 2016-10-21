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
	"lls": {"lls_reception": 0.12, "tserv_lls_ftype": "normal", "tserv_lls_fparam_1": 0.55, "tserv_lls_fparam_2": 0.05, "tserv_lls_fparam_3": 0},
	"llf": {"llf_reception": 0.14, "tserv_llf_ftype": "triangular", "tserv_llf_fparam_1": 0.02, "tserv_llf_fparam_2": 0.05, "tserv_llf_fparam_3": 0.12},
	"lla": {"lla_reception": 0.11, "tserv_lla_ftype": "uniform", "tserv_lla_fparam_1": 0.06, "tserv_lla_fparam_2": 0.15, "tserv_lla_fparam_3": 0},
	
	"lrs": {"lrs_reception": 0.12, "tserv_lrs_ftype": "normal", "tserv_lrs_fparam_1": 0.65, "tserv_lrs_fparam_2": 0.04, "tserv_lrs_fparam_3": 0},
	"lrf": {"lrf_reception": 0.13, "tserv_lrf_ftype": "uniform", "tserv_lrf_fparam_1": 0.16, "tserv_lrf_fparam_2": 0.25, "tserv_lrf_fparam_3": 0},
	"lra": {"lra_reception": 0.15, "tserv_lra_ftype": "triangular", "tserv_lra_fparam_1": 0.05, "tserv_lra_fparam_2": 0.07, "tserv_lra_fparam_3": 0.10},
	
	"rls": {"rls_reception": 0.12, "tserv_rls_ftype": "uniform", "tserv_rls_fparam_1": 0.03, "tserv_rls_fparam_2": 0.11, "tserv_rls_fparam_3": 0},
	"rlf": {"rlf_reception": 0.14, "tserv_rlf_ftype": "normal", "tserv_rlf_fparam_1": 0.46, "tserv_rlf_fparam_2": 0.05, "tserv_rlf_fparam_3": 0},
	"rla": {"rla_reception": 0.11, "tserv_rla_ftype": "normal", "tserv_rla_fparam_1": 0.72, "tserv_rla_fparam_2": 0.09, "tserv_rla_fparam_3": 0},
	
	"rrs": {"rrs_reception": 0.16, "tserv_rrs_ftype": "uniform", "tserv_rrs_fparam_1": 0.09, "tserv_rrs_fparam_2": 0.18, "tserv_rrs_fparam_3": 0},
	"rrf": {"rrf_reception": 0.13, "tserv_rrf_ftype": "triangular", "tserv_rrf_fparam_1": 0.08, "tserv_rrf_fparam_2": 0.15, "tserv_rrf_fparam_3": 0.22},
	"rra": {"rra_reception": 0.16, "tserv_rra_ftype": "normal", "tserv_rra_fparam_1": 0.63, "tserv_rra_fparam_2": 0.04, "tserv_rra_fparam_3": 0}
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
		this.duration = generalConfig["simulation_duration"]*1

		this.rng = new RNG()
		this.localFactory = new MessageFactory(this.rng.exponential, "l")
		this.remoteFactory = new MessageFactory(this.rng.exponential, "r")

		this.receptionCenter = new ReceptionCenter()

		this.eventQueue = new SortedArray([], null, function (a, b) {
			return a.startTime - b.startTime
		})

		this.serviceCenterL = new ServiceCenter(generalConfig["count_server_l"]*1)
		this.serviceCenterR = new ServiceCenter(generalConfig["count_server_r"]*1)

		l = this.localFactory.getNextMessage(this.messageId)
		this.messageId++
		r = this.remoteFactory.getNextMessage(this.messageId)

		this.eventQueue.push(new MessageGenerationEvent(l.creationTime, this.eventQueue, l))
		this.eventQueue.push(new MessageGenerationEvent(r.creationTime, this.eventQueue, r))

		// Statistics
		this.receptionCenterOccupationRate = 0
		this.serviceCenterOccupationRateL = 0
		this.serviceCenterOccupationRateR = 0

		this.fastestMessageTime = 0
		this.slowestMessageTime = 0
		this.totalMessageTime = 0
		this.averageMessageTime = 0

		this.minimumMessagesConcurrently = 0
		this.maximumMessagesConcurrently = 0
		this.averageMessagesConcurrently = 0

		document.getElementById("save_statistics").disabled = true
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

			// dividir pelo tempo total da simulação
			this.serviceCenterOccupationRateL /= this.timer.currentTime
			this.serviceCenterOccupationRateR /= this.timer.currentTime
			this.averageMessagesConcurrently /= this.timer.currentTime

			this.averageMessageTime = this.totalMessageTime / this.messageCount

			document.getElementById("save_statistics").disabled = false
		} else {
			// servidores ocupados / capacidade do servidor * tempo decorrido entre eventos
			this.serviceCenterOccupationRateL += this.serviceCenterL.occupiedServers/this.serviceCenterL.capacity * (nextEvent.startTime*1 - this.timer.currentTime)
			this.serviceCenterOccupationRateR += this.serviceCenterR.occupiedServers/this.serviceCenterR.capacity * (nextEvent.startTime*1 - this.timer.currentTime)
			// numero de mensagens atualmente no sistema * tempo decorrido entre eventos
			this.averageMessagesConcurrently += (this.messageCount - this.leaveCount) * (nextEvent.startTime*1 - this.timer.currentTime)

			this.timer.set(nextEvent.startTime*1)
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

	this.clear = function() {
		clearInterval(this.timeout)
		this.reset()
		document.getElementById("log_box").innerHTML = ""

		document.getElementById("msg_count_local").innerHTML = "0"
		document.getElementById("msg_count_remote").innerHTML = "0"
		document.getElementById("system_total").innerHTML = "0"
		document.getElementById("total_message_local").innerHTML = "0"
		document.getElementById("total_message_remote").innerHTML = "0"
		document.getElementById("local_queue_size").innerHTML = "0"
		document.getElementById("remote_queue_size").innerHTML = "0"
		document.getElementById("timer").innerHTML = "0"
	}

	this.saveStatistics = function() {
		fileContent = "Estatísticas da simulação\n\n"

		fileContent += "Tempo final da simulação: " + this.timer.currentTime + "\n"
		fileContent += "Total de mensagens no sistema: " + this.messageCount + "\n"
		fileContent += "Mínimo de mensagens concorrentes no sistema: " + this.minimumMessagesConcurrently + "\n"
		fileContent += "Máximo de mensagens concorrentes no sistema: " + this.maximumMessagesConcurrently + "\n"
		fileContent += "Média de mensagens concorrentes no sistema: " + this.averageMessagesConcurrently + "\n"

		fileContent += "\nEstatísticas do centro de serviço local:\n"
		fileContent += "Total de mensagens atendidas: " + this.serviceCenterL.messageCount + "\n"
		fileContent += "Taxa média de ocupação dos servidores: " + this.serviceCenterOccupationRateL*100 + "%\n"

		fileContent += "\nEstatísticas do centro de serviço remoto:\n"
		fileContent += "Total de mensagens atendidas: " + this.serviceCenterR.messageCount + "\n"
		fileContent += "Taxa média de ocupação dos servidores: " + this.serviceCenterOccupationRateR*100 + "%\n"
		
		fileContent += "\nEstatísticas das mensagens:\n"
		fileContent += "Tempo mínimo de transito das mensagens no sistema: " + this.fastestMessageTime + "\n"
		fileContent += "Tempo máximo de transito das mensagens no sistema: " + this.slowestMessageTime + "\n"
		fileContent += "Tempo médio de transito das mensagens no sistema: " + this.averageMessageTime + "\n"
		fileContent += "Total de mensagens do tipo LLS: " + (this.serviceCenterL.messageTypeCount["lls"] + this.serviceCenterR.messageTypeCount["lls"]) + "\n"
		fileContent += "Total de mensagens do tipo LLF: " + (this.serviceCenterL.messageTypeCount["llf"] + this.serviceCenterR.messageTypeCount["llf"]) + "\n"
		fileContent += "Total de mensagens do tipo LLA: " + (this.serviceCenterL.messageTypeCount["lla"] + this.serviceCenterR.messageTypeCount["lla"]) + "\n"
		fileContent += "Total de mensagens do tipo LRS: " + (this.serviceCenterL.messageTypeCount["lrs"] + this.serviceCenterR.messageTypeCount["lrs"]) + "\n"
		fileContent += "Total de mensagens do tipo LRF: " + (this.serviceCenterL.messageTypeCount["lrf"] + this.serviceCenterR.messageTypeCount["lrf"]) + "\n"
		fileContent += "Total de mensagens do tipo LRA: " + (this.serviceCenterL.messageTypeCount["lra"] + this.serviceCenterR.messageTypeCount["lra"]) + "\n"
		fileContent += "Total de mensagens do tipo RLS: " + (this.serviceCenterL.messageTypeCount["rls"] + this.serviceCenterR.messageTypeCount["rls"]) + "\n"
		fileContent += "Total de mensagens do tipo RLF: " + (this.serviceCenterL.messageTypeCount["rlf"] + this.serviceCenterR.messageTypeCount["rlf"]) + "\n"
		fileContent += "Total de mensagens do tipo RLA: " + (this.serviceCenterL.messageTypeCount["rla"] + this.serviceCenterR.messageTypeCount["rla"]) + "\n"
		fileContent += "Total de mensagens do tipo RRS: " + (this.serviceCenterL.messageTypeCount["rrs"] + this.serviceCenterR.messageTypeCount["rrs"]) + "\n"
		fileContent += "Total de mensagens do tipo RRF: " + (this.serviceCenterL.messageTypeCount["rrf"] + this.serviceCenterR.messageTypeCount["rrf"]) + "\n"
		fileContent += "Total de mensagens do tipo RRA: " + (this.serviceCenterL.messageTypeCount["rra"] + this.serviceCenterR.messageTypeCount["rra"]) + "\n"

		console.log(fileContent)
	}
}

function ServiceCenter(capacity) {
	this.occupiedServers = 0
	this.queue = new Array()
	this.capacity = capacity
	this.messageCount = 0
	this.messageTypeCount = {
		"lla": 0,
		"llf": 0,
		"lls": 0,
		"lra": 0,
		"lrf": 0,
		"lrs": 0,
		"rla": 0,
		"rlf": 0,
		"rls": 0,
		"rra": 0,
		"rrf": 0,
		"rrs": 0
	}



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
	this.normal = function(u, o) {
	    u1 = Math.random();
	    u2 = Math.random();

	    z = Math.sqrt(-2.0*Math.log(u1))*Math.cos((2.0*3.1415926)*u2);
	    return (u + o * z);
		
	}

	this.exponential = function(a) {
		return -a * (Math.log(1 - Math.random()))
	}

	this.constant = function(a) {
		return a
	}

	this.triangular = function(a, b, c) {
		u = Math.random()

		if(0 <= u && u <= ((b-a)/(c-a))) {
			return a + Math.sqrt(u*((b-a)*(c-a)))
		} else {
			return c - Math.sqrt((1-u)*(c-b)*(c-a))
		}
	}

	this.uniform = function(a, b) {
		return a + ((b - a) * Math.random() );
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

			if(simulation.maximumMessagesConcurrently == 0 || simulation.maximumMessagesConcurrently < simulation.messageCount - simulation.leaveCount) {
				simulation.maximumMessagesConcurrently = simulation.messageCount - simulation.leaveCount
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
		htmlElementId = (this.message.type[1] == "l") ? "msg_count_local" : "msg_count_remote"
		document.getElementById(htmlElementId).innerHTML = this.serviceCenter.occupiedServers

		
		functionType = tserv[this.message.type]["tserv_" + this.message.type + "_ftype"]
		args = [tserv[this.message.type]["tserv_" + this.message.type + "_fparam_1"]*1]
		if(functionInfo[functionType] == 2) {
			args.add(tserv[this.message.type]["tserv_" + this.message.type + "_fparam_2"]*1)
		} else if(functionInfo[functionType] == 3) {
			args.add(tserv[this.message.type]["tserv_" + this.message.type + "_fparam_2"]*1)
			args.add(tserv[this.message.type]["tserv_" + this.message.type + "_fparam_3"]*1)
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

		this.serviceCenter.messageTypeCount[this.message.type]++
	}
}

function MessageDisposalEvent(startTime, eventQueue, message) {
	this.startTime = startTime
	this.eventQueue = eventQueue
	this.message = message

	this.run = function() {
		simulation.log(startTime + ": Mensagem " + this.message.id + " saiu do sistema.")
		simulation.leaveCount++

		messageTime = simulation.timer.currentTime - this.message.creationTime
		if(simulation.fastestMessageTime == 0 || messageTime < simulation.fastestMessageTime) {
			simulation.fastestMessageTime = messageTime
		}
		if(simulation.slowestMessageTime == 0 || messageTime > simulation.slowestMessageTime) {
			simulation.slowestMessageTime = messageTime	
		}
		simulation.totalMessageTime += messageTime

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
