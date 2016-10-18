trafficVolume = {
	"ll": 25,
	"lr": 25,
	"rl": 25,
	"rr": 25
}

generalConfig = {
	"simulation_duration": 500,
	"count_server_1": 1,
	"count_server_2": 1
}

tec = {
	"tec_local_fparam_1": 0.5,
	"tec_remote_fparam_1": 0.6
}

tserv = {
	"lls": {"lls_reception": 0, "tserv_lls_ftype": "constant", "tserv_lls_fparam_1": 0, "tserv_lls_fparam_2": 0, "tserv_lls_fparam_3": 0},
	"llf": {"llf_reception": 0, "tserv_llf_ftype": "constant", "tserv_llf_fparam_1": 0, "tserv_llf_fparam_2": 0, "tserv_llf_fparam_3": 0},
	"lla": {"lla_reception": 0, "tserv_lla_ftype": "constant", "tserv_lla_fparam_1": 0, "tserv_lla_fparam_2": 0, "tserv_lla_fparam_3": 0},
	
	"lrs": {"lrs_reception": 0, "tserv_lrs_ftype": "constant", "tserv_lrs_fparam_1": 0, "tserv_lrs_fparam_2": 0, "tserv_lrs_fparam_3": 0},
	"lrf": {"lrf_reception": 0, "tserv_lrf_ftype": "constant", "tserv_lrf_fparam_1": 0, "tserv_lrf_fparam_2": 0, "tserv_lrf_fparam_3": 0},
	"lra": {"lra_reception": 0, "tserv_lra_ftype": "constant", "tserv_lra_fparam_1": 0, "tserv_lra_fparam_2": 0, "tserv_lra_fparam_3": 0},
	
	"rls": {"rls_reception": 0, "tserv_rls_ftype": "constant", "tserv_rls_fparam_1": 0, "tserv_rls_fparam_2": 0, "tserv_rls_fparam_3": 0},
	"rlf": {"rlf_reception": 0, "tserv_rlf_ftype": "constant", "tserv_rlf_fparam_1": 0, "tserv_rlf_fparam_2": 0, "tserv_rlf_fparam_3": 0},
	"rla": {"rla_reception": 0, "tserv_rla_ftype": "constant", "tserv_rla_fparam_1": 0, "tserv_rla_fparam_2": 0, "tserv_rla_fparam_3": 0},
	
	"rrs": {"rrs_reception": 0, "tserv_rrs_ftype": "constant", "tserv_rrs_fparam_1": 0, "tserv_rrs_fparam_2": 0, "tserv_rrs_fparam_3": 0},
	"rrf": {"rrf_reception": 0, "tserv_rrf_ftype": "constant", "tserv_rrf_fparam_1": 0, "tserv_rrf_fparam_2": 0, "tserv_rrf_fparam_3": 0},
	"rra": {"rra_reception": 0, "tserv_rra_ftype": "constant", "tserv_rra_fparam_1": 0, "tserv_rra_fparam_2": 0, "tserv_rra_fparam_3": 0}
}

prob = {
	"ll": {"ll_success": 0, "ll_failure": 0, "ll_delay": 0},
	"lr": {"lr_success": 0, "lr_failure": 0, "lr_delay": 0},
	"rl": {"rl_success": 0, "rl_failure": 0, "rl_delay": 0},
	"rr": {"rr_success": 0, "rr_failure": 0, "rr_delay": 0}
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
		trafficVolume[key] = document.getElementById(key).value		
	}

	for(key in generalConfig) {
		generalConfig[key] = document.getElementById(key).value		
	}

	for(key in tec) {
		tec[key] = document.getElementById(key).value		
	}

	for(key in tserv) {
		for(key2 in tserv[key]) {
	 		tserv[key][key2] = document.getElementById(key2).value
		}
	}

	for(key in prob) {
		for(key2 in prob[key]) {
			prob[key][key2] = document.getElementById(key2).value
		}
	}

	simulation.duration = generalConfig["simulation_duration"]
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
	enableFields();
}

function updateSimulationInfo(currentTime) {
	document.getElementById("timer").innerHTML = currentTime
	console.log(document.getElementById("timer"))
}

function Simulation() {

	this.reset = function() {
		console.log("reset")
		this.timer = new Timer()
		this.duration = generalConfig["simulation_duration"]
		this.eventQueue = new SortedArray([], null, function (a, b) {
			return a.startTime - b.startTime;
        });
	}

	this.reset()
	
	//temp
	this.eventQueue.push(new Event(0, 50, this.timer))
	this.eventQueue.push(new Event(55, 60, this.timer))

	this.run = function() {
		console.log("run") 
		status = "RUNNING"
		this.step()
	}

	this.pause = function() {
		status = "PAUSED"
		console.log("pause")
	}

	this.stop = function() {
		status = "STOPPED"
		console.log("stop")
		this.reset()
	}

	this.step = function() {
		var event = this.goToNextEvent()
		event.run()
		console.log(this.timer.currentTime)
		updateSimulationInfo(this.timer.currentTime)
		console.log("step by step")
	}

	this.goToNextEvent = function() {
		var event = this.eventQueue.shift()
		this.timer.currentTime = event.startTime
		return event
	}
}

function Timer() {
	this.currentTime = 0

	this.advanceTime = function(amount) {
		this.currentTime += amount
	}
}

function RNG() {
	this.normal = function(a, b) {
		//TODO
	}

	this.exponential = function(a) {
		return -a * (Math.log(1 - Math.random()));
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

function Event(startTime, eventDuration, timer) {
	this.startTime = startTime
	this.eventDuration = eventDuration
	this.timer = timer

	this.run = function() {
		this.timer.currentTime += eventDuration
	}
}