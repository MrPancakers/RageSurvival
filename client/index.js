(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const absolute_path="package://RageZombies/cef/views/";class CEFBrowser{constructor(e){this._setup(e)}_setup(e){this.browser=mp.browsers.new(absolute_path+e),this.cursorState=!1}call(){let e=Array.prototype.slice.call(arguments),s=e[0],t="(";for(let s=1;s<e.length;s++){switch(typeof e[s]){case"string":t+="'"+e[s]+"'";break;case"number":case"boolean":t+=e[s];break;case"object":t+=JSON.stringify(e[s])}s<e.length-1&&(t+=",")}s+=t+=");",this.browser.execute(s)}active(e){this.browser.active=e}get isActive(){return this.browser.active}cursor(e){this.cursorState=e,mp.gui.cursor.visible=e}load(e){this.browser.url=absolute_path+e}}module.exports=CEFBrowser;

},{}],2:[function(require,module,exports){
const movementClipSet="move_ped_crouched",strafeClipSet="move_ped_crouched_strafing",clipSetSwitchTime=.25,loadClipSet=e=>{for(mp.game.streaming.requestClipSet(e);!mp.game.streaming.hasClipSetLoaded(e);)mp.game.wait(0)};loadClipSet(movementClipSet),loadClipSet(strafeClipSet),mp.events.add("entityStreamIn",e=>{"player"===e.type&&e.getVariable("isCrouched")&&(e.setMovementClipset(movementClipSet,.25),e.setStrafeClipset(strafeClipSet))}),mp.events.addDataHandler("isCrouched",(e,t)=>{"player"===e.type&&(t?(e.setMovementClipset(movementClipSet,.25),e.setStrafeClipset(strafeClipSet)):(e.resetMovementClipset(.25),e.resetStrafeClipset()))}),mp.keys.bind(17,!1,()=>{mp.events.callRemote("Player:Crouch")});

},{}],3:[function(require,module,exports){
require("./vector.js");var natives=require("./natives.js"),materials=require("./materials.js");function checkResourceInFront(e){let r={dist:e,pos:null,resource:""},s=new mp.Vector3(mp.players.local.position.x,mp.players.local.position.y,mp.players.local.position.z),o=mp.players.local.getHeading();s=s.findRot(o,.5,90);for(var i=0;i<180;i+=10){let e=s.findRot(o,5,i),t=mp.raycasting.testCapsule(s,e,.1,mp.players.local.handle,-1);if(t){e=new mp.Vector3(t.position.x,t.position.y,t.position.z);let o=s.dist(e);o<r.dist&&null!=materials[t.material]&&(r.dist=o,r.pos=e,r.resource=materials[t.material])}}return""!=r.resource&&r.resource}mp.keys.bind(9,!1,()=>{console.log(JSON.stringify(checkResourceInFront(2)))});

},{"./materials.js":7,"./natives.js":8,"./vector.js":14}],4:[function(require,module,exports){
console.log=function(...e){mp.gui.chat.push("DEBUG:"+e.join(" "))},require("./scaleforms/index.js"),require("./crouch.js"),require("./items.js"),require("./zombies.js"),require("./gathering.js"),require("./loot_spawns_placement.js");var LastCam,natives=require("./natives.js"),CEFBrowser=require("./browser.js"),Browser=new CEFBrowser("login/index.html");function clearBlips(){natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT(!0);let e=natives.GET_FIRST_BLIP_INFO_ID(5);for(;natives.DOES_BLIP_EXIST(e);)mp.game.ui.removeBlip(e),e=natives.GET_NEXT_BLIP_INFO_ID(5);mp.game.wait(50)}mp.events.callRemote("ServerAccount:Ready"),mp.game.graphics.transitionToBlurred(1),mp.events.add("Server:RequestLogin",()=>{clearBlips(),(LastCam=mp.cameras.new("default",new mp.Vector3(593.5968627929688,-1820.015869140625,142.7814483642578),new mp.Vector3,60)).pointAtCoord(163.39794921875,-1788.3284912109375,27.982322692871094),LastCam.setActive(!0),mp.game.cam.renderScriptCams(!0,!1,0,!0,!1),mp.game.ui.displayHud(!1),mp.game.ui.displayRadar(!1),mp.game.graphics.transitionToBlurred(1),Browser.cursor(!0),setTimeout(function(){Browser.call("cef_loadlogin",mp.players.local.name)},100)}),mp.events.add("Account:Alert",function(...e){Browser.call("alert_login",e[0])}),mp.events.add("Account:HideLogin",()=>{mp.game.graphics.transitionFromBlurred(500),Browser.cursor(!1),Browser.call("cef_hidelogin")}),mp.events.add("Account:LoginDone",()=>{mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setHealthRechargeMultiplier(0),mp.game.ui.displayRadar(!0),mp.game.ui.displayHud(!0),mp.game.ui.setMinimapVisible(!1)}),mp.events.add("Cam:Hide",()=>{mp.game.graphics.transitionFromBlurred(100),LastCam.setActive(!1),mp.game.cam.renderScriptCams(!1,!1,0,!0,!1),mp.game.ui.displayRadar(!0),mp.game.ui.displayHud(!0),mp.game.ui.setMinimapVisible(!1),mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setHealthRechargeMultiplier(0)}),mp.events.add("entityStreamIn",e=>{"player"===e.type&&(mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setLockonRangeOverride(0))}),mp.events.add("Account:Login",(e,a)=>{mp.events.callRemote("ServerAccount:Login",e,a)}),mp.events.add("Account:Register",(e,a,r)=>{mp.events.callRemote("ServerAccount:Register",e,a,r)}),mp.events.add("Notifications:New",e=>{Browser.call("notify",e)}),mp.events.add("Player:Collision",e=>{1==e?mp.vehicles.forEach(e=>{mp.players.local.vehicle&&(mp.players.local.vehicle.setNoCollision(e.handle,!0),natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle,e,!0),natives.SET_ENTITY_NO_COLLISION_ENTITY(e,mp.players.local.vehicle,!0)),e.setAlpha(255)}):mp.vehicles.forEach(e=>{mp.players.local.vehicle&&(mp.players.local.vehicle.setNoCollision(e.handle,!1),natives.SET_ENTITY_NO_COLLISION_ENTITY(e,mp.players.local.vehicle,!1),natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle,e,!1)),e.setAlpha(150)})});

},{"./browser.js":1,"./crouch.js":2,"./gathering.js":3,"./items.js":5,"./loot_spawns_placement.js":6,"./natives.js":8,"./scaleforms/index.js":13,"./zombies.js":15}],5:[function(require,module,exports){
require("./vector.js");var streamedPools=[];class LootPool{constructor(o){this._setup(o)}_setup(o){this._lootData=o,this._pickupObjects=[],this.initLootObjects()}set data(o){this._lootData=o}get position(){return new mp.Vector3(this._lootData.pos.x,this._lootData.pos.y,this._lootData.pos.z)}getLootPool(){return this._lootData.items}isInRange(){return new mp.Vector3(this._lootData.pos.x,this._lootData.pos.y,this._lootData.pos.z).dist(mp.players.local.position)<2}initLootObjects(){let o=this;console.log("loot objects init");let t=new mp.Vector3(o._lootData.pos.x,o._lootData.pos.y,o._lootData.pos.z),e=360/o._lootData.items.length;o._lootData.items.forEach(function(s,a){let l=t.findRot(0,.5,e*a),n=e*a+Math.floor(360*Math.random());n>360&&(n-=360);var r=l.findRot(0,.1,n+180).ground(),i=l.findRot(0,.1,n+0).ground(),d=l.findRot(0,.1,n+270).ground(),p=l.findRot(0,.1,n+90).ground();d.rotPoint(p),r.rotPoint(i);let c=l.ground();c.z+=1;let m=mp.objects.new(mp.game.joaat(s.model),c,{rotation:new mp.Vector3(0,0,n),alpha:255,dimension:0});m.placeOnGroundProperly();let g=m.getRotation(0),u=m.getCoords(!1);m.setCollision(!1,!0),m.setCoords(u.x+s.offset.pos.x,u.y+s.offset.pos.y,u.z-m.getHeightAboveGround()+s.offset.pos.z,!1,!1,!1,!1),m.setRotation(g.x+s.offset.rot.x,g.y+s.offset.rot.y,g.z,0,!0),o._pickupObjects.push({id:o._lootData.id,obj:m})})}render(){}unload(o){let t=this;console.log("DO UNLOADING"),t._pickupObjects.forEach(function(e,s){e.id==o&&(console.log("remove"),e.obj.markForDeletion(),e.obj.destroy(),delete t._pickupObjects[s])})}}mp.events.add("Loot:Load",(o,t)=>{streamedPools[o]||(console.log("Creating LootPool",o),streamedPools[o]=new LootPool(t))}),mp.events.add("Loot:Unload",o=>{streamedPools[o]&&(console.log("Unload LootPool",o),streamedPools[o].unload(o),delete streamedPools[o])}),mp.events.add("Loot:Reload",(o,t)=>{streamedPools[o]&&(console.log("Reload LootPool",o),streamedPools[o].data=t)}),mp.events.add("render",()=>{Object.keys(streamedPools).forEach(function(o){let t=streamedPools[o],e=t.position,s=360/t.getLootPool().length;t.getLootPool().forEach(function(o,t){let a=e.findRot(0,.5,s*t).ground();mp.game.graphics.drawText(o.name,[a.x,a.y,a.z+.3],{font:4,color:[255,255,255,185],scale:[.3,.3],outline:!0,centre:!0})})})});

},{"./vector.js":14}],6:[function(require,module,exports){
(function (global){
const controlsIds={F5:327,W:32,S:33,A:34,D:35,Space:321,LCtrl:326,Mouse1:24,Mouse2:25,Shift:21};global.fly={flying:!1,f:2,w:2,h:2,point_distance:1e3},global.gameplayCam=mp.cameras.new("gameplay"),mp.game.graphics.notify("~r~F5~w~ - enable/disable");let direction=null,coords=null;function pointingAt(e){const o=new mp.Vector3(direction.x*e+coords.x,direction.y*e+coords.y,direction.z*e+coords.z),t=mp.raycasting.testPointToPoint(coords,o,mp.players.local,[1,16]);if(void 0!==t)return t}var placed_loot_pool=[];function getNearestSpot(e,o){let t={index:-1,pos:null,dist:o};return placed_loot_pool.forEach(function(o,l){let s=new mp.Vector3(o.x,o.y,o.z),r=e.dist(s);r<t.dist&&(t.dist=r,t.pos=s,t.index=l)}),t}mp.events.add("updateLootPool",e=>{placed_loot_pool=e});let selected_type="Residential",types=["Industrial","Other","Military","Residential","Food","Hospital","Police","Resdential","Beach","Forest","Farm","Land"];function getSelectedType(){return selected_type}mp.events.add("render",()=>{const e=global.fly;if(direction=global.gameplayCam.getDirection(),coords=global.gameplayCam.getCoord(),mp.game.controls.isControlJustPressed(0,controlsIds.F5)){e.flying=!e.flying;const o=mp.players.local;if(o.setInvincible(e.flying),o.freezePosition(e.flying),o.setAlpha(e.flying?0:255),!e.flying){const e=mp.players.local.position;e.z=mp.game.gameplay.getGroundZFor3dCoord(e.x,e.y,e.z,0,!1),mp.players.local.setCoordsNoOffset(e.x,e.y,e.z,!1,!1,!1)}mp.game.graphics.notify(e.flying?"Fly: ~g~Enabled":"Fly: ~r~Disabled")}else if(e.flying){let o=!1;const t=mp.players.local.position;if(mp.game.controls.isControlPressed(0,controlsIds.W)?(mp.game.controls.isControlPressed(0,controlsIds.LCtrl)&&(e.f=.1),mp.game.controls.isControlPressed(0,controlsIds.Shift)&&(e.f=4),t.x+=direction.x*e.f,t.y+=direction.y*e.f,t.z+=direction.z*e.f,o=!0):mp.game.controls.isControlPressed(0,controlsIds.S)?(mp.game.controls.isControlPressed(0,controlsIds.LCtrl)&&(e.f=.1),mp.game.controls.isControlPressed(0,controlsIds.Shift)&&(e.f=4),t.x-=direction.x*e.f,t.y-=direction.y*e.f,t.z-=direction.z*e.f,o=!0):e.f=2,mp.game.controls.isControlPressed(0,controlsIds.A)?(mp.game.controls.isControlPressed(0,controlsIds.LCtrl)&&(e.l=.1),mp.game.controls.isControlPressed(0,controlsIds.Shift)&&(e.l=4),t.x+=-direction.y*e.l,t.y+=direction.x*e.l,o=!0):mp.game.controls.isControlPressed(0,controlsIds.D)?(mp.game.controls.isControlPressed(0,controlsIds.LCtrl)&&(e.l=.1),mp.game.controls.isControlPressed(0,controlsIds.Shift)&&(e.l=4),t.x-=-direction.y*e.l,t.y-=direction.x*e.l,o=!0):e.l=2,mp.game.controls.disableControlAction(2,16,!0),mp.game.controls.disableControlAction(2,17,!0),mp.game.controls.isDisabledControlJustPressed(2,16)){let e=types.indexOf(getSelectedType());e+1>types.length?e=types.length:e+=1,types[e]&&(selected_type=types[e])}else if(mp.game.controls.isDisabledControlJustPressed(2,17)){let e=types.indexOf(getSelectedType());e-1<0?e=0:e-=1,types[e]&&(selected_type=types[e])}mp.game.ui.showHudComponentThisFrame(14);let l=pointingAt(1e3);if(null!=l){let e=mp.vector(l.position);e.z+=.02,-1==getNearestSpot(e,2).index?(mp.game.graphics.drawMarker(28,e.x,e.y,e.z,0,0,0,0,0,0,1,1,1,0,150,0,150,!1,!1,2,!1,"","",!1),mp.game.graphics.drawText("Selected Type "+selected_type+"\n MouseWheel to Switch",[e.x,e.y,e.z],{font:4,color:[255,255,255,185],scale:[.3,.3],outline:!0,centre:!0}),mp.game.controls.isControlJustPressed(0,controlsIds.Mouse1)&&mp.events.callRemote("LootTable:PlaceSpot",e.x,e.y,e.z,getSelectedType(),placed_loot_pool.length)):mp.game.graphics.drawMarker(28,e.x,e.y,e.z,0,0,0,0,0,0,1,1,1,150,0,0,150,!1,!1,2,!1,"","",!1)}o&&mp.players.local.setCoordsNoOffset(t.x,t.y,t.z,!1,!1,!1)}}),mp.events.add("render",()=>{let e=pointingAt(1e3);e=null!=e&&mp.vector(e.position),placed_loot_pool.forEach(function(o,t){if(mp.vector(o).dist(mp.players.local.position)<100){if(0!=e){getNearestSpot(e,2).index==t?(mp.game.graphics.drawMarker(28,o.x,o.y,o.z,0,0,0,0,0,0,1,1,1,150,0,150,150,!1,!1,2,!1,"","",!1),mp.game.graphics.drawText("Right Click to Remove",[o.x,o.y,o.z+.3],{font:4,color:[255,255,255,185],scale:[.3,.3],outline:!0,centre:!0}),mp.game.controls.isControlJustPressed(0,controlsIds.Mouse2)&&mp.events.callRemote("LootTable:RemoveSpot",t,placed_loot_pool.length)):mp.game.graphics.drawMarker(28,o.x,o.y,o.z,0,0,0,0,0,0,1,1,1,0,0,150,150,!1,!1,2,!1,"","",!1)}else mp.game.graphics.drawMarker(28,o.x,o.y,o.z,0,0,0,0,0,0,1,1,1,0,0,150,150,!1,!1,2,!1,"","",!1);mp.game.graphics.drawText(o.type,[o.x,o.y,o.z],{font:4,color:[255,255,255,185],scale:[.3,.3],outline:!0,centre:!0})}})});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
var materials={2379541433:"Tree",127813971:"Stone",3454750755:"Mineral Stone",581794674:"Vegetation"};module.exports=materials;

},{}],8:[function(require,module,exports){
var natives={};mp.game.graphics.clearDrawOrigin=(()=>mp.game.invoke("0xFF0B610F6BE0D7AF")),natives.START_PLAYER_TELEPORT=((E,e,_,a,i,n,m,T)=>mp.game.invoke("0xAD15F075A4DA0FDE",E,e,_,a,i,n,m,T)),natives.CHANGE_PLAYER_PED=((E,e,_)=>mp.game.invoke("0x048189FAC643DEEE",E,e,_)),natives.SET_PED_CURRENT_WEAPON_VISIBLE=((E,e,_,a,i)=>mp.game.invoke("0x0725A4CCFDED9A70",E,e,_,a,i)),natives.SET_BLIP_SPRITE=((E,e)=>mp.game.invoke("0xDF735600A4696DAF",E,e)),natives.SET_BLIP_ALPHA=((E,e)=>mp.game.invoke("0x45FF974EEE1C8734",E,e)),natives.SET_BLIP_COLOUR=((E,e)=>mp.game.invoke("0x03D7FB09E75D6B7E",E,e)),natives.SET_BLIP_ROTATION=((E,e)=>mp.game.invoke("0xF87683CDF73C3F6E",E,e)),natives.SET_BLIP_FLASHES=((E,e)=>mp.game.invoke("0xB14552383D39CE3E",E,e)),natives.SET_BLIP_FLASH_TIMER=((E,e)=>mp.game.invoke("0xD3CD6FD297AE87CC",E,e)),natives.SET_BLIP_COORDS=((E,e,_,a)=>mp.game.invoke("0xAE2AF67E9D9AF65D",E,e,_,a)),natives.SET_CURSOR_LOCATION=((E,e)=>mp.game.invoke("0xFC695459D4D0E219",E,e)),natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT=(E=>mp.game.invoke("0xB98236CAAECEF897",E)),natives.GET_FIRST_BLIP_INFO_ID=(E=>mp.game.invoke("0x1BEDE233E6CD2A1F",E)),natives.GET_NEXT_BLIP_INFO_ID=(E=>mp.game.invoke("0x14F96AA50D6FBEA7",E)),natives.DOES_BLIP_EXIST=(E=>mp.game.invoke("0xA6DB27D19ECBB7DA",E)),natives.GET_NUMBER_OF_ACTIVE_BLIPS=(()=>mp.game.invoke("0x9A3FF3DE163034E8")),natives.SET_BLIP_SCALE=((E,e)=>mp.game.invoke("0xD38744167B2FA257",E,e)),natives.SET_ENTITY_NO_COLLISION_ENTITY=((E,e,_)=>mp.game.invoke("0xA53ED5520C07654A",E.handle,e.handle,_)),natives.GET_CLOSEST_OBJECT_OF_TYPE=((E,e,_,a,i,n,m,T)=>mp.game.invoke("0xE143FA2249364369",E,e,_,a,i,n,m,T)),natives.DOES_OBJECT_OF_TYPE_EXIST_AT_COORDS=((E,e,_,a,i,n)=>mp.game.invoke("0xBFA48E2FF417213F",E,e,_,a,i,n)),module.exports=natives;

},{}],9:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");let bigMessageScaleform=null,bigMsgInit=0,bigMsgDuration=5e3,bigMsgAnimatedOut=!1;mp.events.add("ShowWeaponPurchasedMessage",(e,g,s,a=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_WEAPON_PURCHASED",e,g,s),bigMsgInit=Date.now(),bigMsgDuration=a,bigMsgAnimatedOut=!1}),mp.events.add("ShowPlaneMessage",(e,g,s,a=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_PLANE_MESSAGE",e,g,s),bigMsgInit=Date.now(),bigMsgDuration=a,bigMsgAnimatedOut=!1}),mp.events.add("ShowShardMessage",(e,g,s,a,i=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_SHARD_CENTERED_MP_MESSAGE",e,g,s,a),bigMsgInit=Date.now(),bigMsgDuration=i,bigMsgAnimatedOut=!1}),mp.events.add("render",()=>{null!=bigMessageScaleform&&(bigMessageScaleform.renderFullscreen(),bigMsgInit>0&&Date.now()-bigMsgInit>bigMsgDuration&&(bigMsgAnimatedOut?(bigMsgInit=0,bigMessageScaleform.dispose(),bigMessageScaleform=null):(bigMessageScaleform.callFunction("TRANSITION_OUT"),bigMsgAnimatedOut=!0,bigMsgDuration+=750)))});

},{"./Scaleform.js":12}],10:[function(require,module,exports){
class InstructionButtons{constructor(){for(this.handle=mp.game.graphics.requestScaleformMovie("instructional_buttons"),this.ScIndex=0;!mp.game.graphics.hasScaleformMovieLoaded(this.handle);)mp.game.wait(0)}InitButtons(e,a,i){this.ScIndex=0,mp.game.graphics.drawScaleformMovieFullscreen(this.handle,255,255,255,0,!1),mp.game.graphics.pushScaleformMovieFunction(this.handle,"CLEAR_ALL"),mp.game.graphics.popScaleformMovieFunctionVoid(),mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_CLEAR_SPACE"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(200),mp.game.graphics.popScaleformMovieFunctionVoid()}AddButton(e,a){"number"==typeof a?(mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_DATA_SLOT"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(this.ScIndex),mp.game.graphics.pushScaleformMovieFunctionParameterInt(a),mp.game.graphics.pushScaleformMovieFunctionParameterString(e),mp.game.graphics.popScaleformMovieFunctionVoid(),this.ScIndex++):(mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_DATA_SLOT"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(this.ScIndex),mp.game.graphics.pushScaleformMovieFunctionParameterString(a),mp.game.graphics.pushScaleformMovieFunctionParameterString(e),mp.game.graphics.popScaleformMovieFunctionVoid(),this.ScIndex++)}finalizeButtons(e=1,a,i,o,m){mp.game.graphics.pushScaleformMovieFunction(this.handle,"DRAW_INSTRUCTIONAL_BUTTONS"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(e),mp.game.graphics.popScaleformMovieFunctionVoid(),mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_BACKGROUND_COLOUR"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(a),mp.game.graphics.pushScaleformMovieFunctionParameterInt(i),mp.game.graphics.pushScaleformMovieFunctionParameterInt(o),mp.game.graphics.pushScaleformMovieFunctionParameterInt(m),mp.game.graphics.popScaleformMovieFunctionVoid()}}module.exports=new InstructionButtons;

},{}],11:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");let midsizedMessageScaleform=null,msgInit=0,msgDuration=5e3,msgAnimatedOut=!1,msgBgColor=0;mp.events.add("ShowMidsizedMessage",(e,s,m=5e3)=>{null==midsizedMessageScaleform&&(midsizedMessageScaleform=new messageScaleform("midsized_message")),midsizedMessageScaleform.callFunction("SHOW_MIDSIZED_MESSAGE",e,s),msgInit=Date.now(),msgDuration=m,msgAnimatedOut=!1}),mp.events.add("ShowMidsizedShardMessage",(e,s,m,a,i,d=5e3)=>{null==midsizedMessageScaleform&&(midsizedMessageScaleform=new messageScaleform("midsized_message")),midsizedMessageScaleform.callFunction("SHOW_SHARD_MIDSIZED_MESSAGE",e,s,m,a,i),msgInit=Date.now(),msgDuration=d,msgAnimatedOut=!1,msgBgColor=m}),mp.events.add("render",()=>{null!=midsizedMessageScaleform&&(midsizedMessageScaleform.renderFullscreen(),msgInit>0&&Date.now()-msgInit>msgDuration&&(msgAnimatedOut?(msgInit=0,midsizedMessageScaleform.dispose(),midsizedMessageScaleform=null):(midsizedMessageScaleform.callFunction("SHARD_ANIM_OUT",msgBgColor),msgAnimatedOut=!0,msgDuration+=750)))});

},{"./Scaleform.js":12}],12:[function(require,module,exports){
class BasicScaleform{constructor(e){for(this.handle=mp.game.graphics.requestScaleformMovie(e);!mp.game.graphics.hasScaleformMovieLoaded(this.handle);)mp.game.wait(0)}callFunction(e,...a){mp.game.graphics.pushScaleformMovieFunction(this.handle,e),a.forEach(e=>{switch(typeof e){case"string":mp.game.graphics.pushScaleformMovieFunctionParameterString(e);break;case"boolean":mp.game.graphics.pushScaleformMovieFunctionParameterBool(e);break;case"number":Number(e)===e&&e%1!=0?mp.game.graphics.pushScaleformMovieFunctionParameterFloat(e):mp.game.graphics.pushScaleformMovieFunctionParameterInt(e)}}),mp.game.graphics.popScaleformMovieFunctionVoid()}renderFullscreen(){mp.game.graphics.drawScaleformMovieFullscreen(this.handle,255,255,255,255,!1)}dispose(){mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this.handle)}}module.exports=BasicScaleform;

},{}],13:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");require("./BigMessage.js"),require("./MidsizedMessage.js"),mp.game.ui.instructionalButtons=require("./InstructionButtons.js"),mp.game.ui.messages={showShard:(e,s,a,i,r=5e3)=>mp.events.call("ShowShardMessage",e,s,a,i,r),showWeaponPurchased:(e,s,a,i=5e3)=>mp.events.call("ShowWeaponPurchasedMessage",e,s,a,i),showPlane:(e,s,a,i=5e3)=>mp.events.call("ShowPlaneMessage",e,s,a,i),showMidsized:(e,s,a=5e3)=>mp.events.call("ShowMidsizedMessage",e,s,a),showMidsizedShard:(e,s,a,i,r,o=5e3)=>mp.events.call("ShowMidsizedShardMessage",e,s,a,i,r,o)};

},{"./BigMessage.js":9,"./InstructionButtons.js":10,"./MidsizedMessage.js":11,"./Scaleform.js":12}],14:[function(require,module,exports){
mp.Vector3.prototype.findRot=function(t,o,r){let e=new mp.Vector3(this.x,this.y,this.z);var i=(t+r)*(Math.PI/180);return e.x=this.x+o*Math.cos(i),e.y=this.y+o*Math.sin(i),e},mp.Vector3.prototype.rotPoint=function(t){var o=new mp.Vector3(this.x,this.y,this.z),r=new mp.Vector3(t.x,t.y,t.z),e=r.z-o.z,i=o.x-r.x,h=o.y-r.y,s=Math.sqrt(i*i+h*h);return 180*Math.atan2(e,s)/Math.PI},mp.Vector3.prototype.multiply=function(t){let o=new mp.Vector3(this.x,this.y,this.z);return o.x=this.x*t,o.y=this.y*t,o.z=this.z*t,this},mp.Vector3.prototype.dist=function(t){let o=this.x-t.x,r=this.y-t.y,e=this.z-t.z;return Math.sqrt(o*o+r*r+e*e)},mp.Vector3.prototype.getOffset=function(t){let o=this.x-t.x,r=this.y-t.y,e=this.z-t.z;return new mp.Vector3(o,r,e)},mp.Vector3.prototype.cross=function(t){let o=new mp.Vector3(0,0,0);return o.x=this.y*t.z-this.z*t.y,o.y=this.z*t.x-this.x*t.z,o.z=this.x*t.y-this.y*t.x,o},mp.Vector3.prototype.normalize=function(){let t=new mp.Vector3(0,0,0),o=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return t.x=this.x/o,t.y=this.y/o,t.z=this.z/o,t},mp.Vector3.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},mp.Vector3.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},mp.Vector3.prototype.angle=function(t){return Math.acos(this.normalize().dot(t.normalize()))},mp.Vector3.prototype.ground=function(){let t=new mp.Vector3(this.x,this.y,this.z);return t.z=mp.game.gameplay.getGroundZFor3dCoord(t.x,t.y,t.z,0,!1),t},mp.vector=function(t){return new mp.Vector3(t.x,t.y,t.z)};

},{}],15:[function(require,module,exports){
var tick_rate=16,Zombie=class{constructor(e,t,s){this._setup(e,t,s)}_setup(e,t,s){let o=this;o._id=e,o._skin=s,o._pos=mp.vector({x:0,y:0,z:0}),o._targetPos=mp.vector({x:0,y:0,z:0}),o.updatePackage(t),o._ped=mp.peds.new(mp.game.joaat(o._skin),o._pos,0,function(e){},0),o._ped.freezePosition(!1),o._target=null,o._currentMove="walk",o._health=100,o._range=25,o._acceptedErrorPosition=2,o._maxNoHeartbeat=1e3,o._leader="",o._ready=!1,o._dead=!1,o._syncer=void 0,o._needsUpdate=!1,o._lastHeartbeat=Date.now(),o._newPackage={},o._oldPackage={target:o._target,move:o._currentMove,health:o._health,syncer:o._syncer,pos:o._pos,nextpos:o._tagetPos},o._nextPackage=[],o._updater=setInterval(function(){o._update()},1e3/tick_rate)}get id(){return this._id}get position(){return this._pos}get ready(){return this._ready}get syncer(){return this._syncer}get getHeartbeat(){return this._lastHeartbeat}dead(){this._ped&&(this._ped.destroy(),this._ped=null),clearInterval(this._updater),ZombieManager.removeZombie(this,!0)}setHealth(e){this._health=e}setTarget(e){this._target=e}setMove(e){this._currentMove=e}setNextPos(e){this._targetPos=mp.vector(e)}setPos(e){console.log("setPos"),this._pos=mp.vector(e),this._ped&&this._pos.dist(this._ped.getCoords(!0))>this._acceptedErrorPosition&&(this._ped.position=this._pos,this._ped.setCoords(this._pos.x,this._pos.y,this._pos.z-1,!0,!0,!0,!1)),this._ready||(this._ready=!0)}setSyncer(e){console.log("setSyncer"),this._syncer=e}updatePackage(e){let t=this;t._lastHeartbeat=Date.now(),t._newPackage=e,e.forEach(function(e){"setTarget"==e.type&&t.setTarget(e.data),"setMove"==e.type&&t.setMove(e.data),"setHealth"==e.type&&t.setHealth(e.data),"setPos"==e.type&&t.setPos(e.data),"setNextPos"==e.type&&t.setNextPos(e.data),"setSyncer"==e.type&&t.setSyncer(e.data)})}_update(){let e=this;if(Date.now()-e._lastHeartbeat>e._maxNoHeartbeat&&e.dead(),e._ped){if(e.syncer==mp.players.local.name){let t=Object.keys(e._nextPackage);if(t.setPos||e._pos.dist(e._ped.getCoords(!0))>.2&&(e._nextPackage.setPos=this._ped.getCoords(!0)),t.length>0){let t=Object.keys(e._nextPackage).map(function(t){return{type:t,data:e._nextPackage[t]}});mp.events.callRemote("Zombie:ReSync",e.id,JSON.stringify(t))}}e._ped.taskGoToCoordAnyMeans(e._targetPos.x,e._targetPos.y,e._targetPos.z,1,0,!1,786603,0)}}},ZombieManager=new class{constructor(){this._allZombies=[]}getAllZombies(){return this._allZombies}newZombie(e,t,s){let o=new Zombie(e,t,s);return this._allZombies.push(o),console.log("Added Zombie"),o}updateZombie(e,t,s){let o=this,a=o.getZombieById(e);-1==a?o.newZombie(e,t,s):a.zombie.updatePackage(t)}removeZombie(e,t){let s=this._allZombies.indexOf(e);1==t?s>-1&&(this._allZombies[s]=null,this._allZombies.splice(s,1),delete this._allZombies[s],console.log("Removed Zombie")):this._allZombies[s].dead()}getZombieById(e){let t=this._allZombies.findIndex(function(t){return null!=t&&t._id==e});return t>-1?{zombie:this._allZombies[t],index:t}:-1}render(){}};mp.events.add("render",()=>{ZombieManager.getAllZombies().forEach(function(e){null!=e&&e.ready&&mp.game.graphics.drawText(e.id+"\nSyncer "+(e.syncer==mp.players.local.name),[e.position.x,e.position.y,e.position.z],{font:4,color:[255,255,255,185],scale:[.3,.3],outline:!0,centre:!0})})}),mp.events.add("Zombies:Sync",(e,t,s)=>{console.log("Zombies:Sync"),ZombieManager.updateZombie(e,t,s)}),mp.events.add("Zombies:Remove",e=>{console.log("Zombies:Remove");let t=ZombieManager.getZombieById(e);ZombieManager.removeZombie(t,!1)});

},{}]},{},[4]);
