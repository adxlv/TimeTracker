var app=angular.module("Timetracker.controllers",[]).controller("IndexController",function(e,t,o,n){var s=o.$$absUrl,i=new RegExp("\\?ckcachecontrol=\\d*");s=s.replace(i,"");var r=new RegExp(".*"+o.$$host+"(.*:.*?)?/");s=s.replace(r,""),s=s.replace("#"+o.$$path,""),console.log("IndexController",s,o),"desktopapp/dash"===s&&n.go("tasks")}).controller("ClientsController",function(e,t,o,n,s,i,r,a,c){e.checkLoginStatuss(),n.stateParams=i,n.filters={archived:!1},"undefined"==typeof o.current.views?(n.weareinview=!1,n.clients=c.query(function(){r(function(){Projects_BindOnhoverEffects()},100)})):(n.weareinview=!0,n.clients=c.getMyProjects(function(){r(function(){Projects_BindOnhoverEffects()},100)})),n.destroy=function(e){c["delete"]({id:e},function(){for(var t=n.clients.length-1;t>=0;t--)n.clients[t].id==e&&n.clients.splice(t,1);o.params.clientId==e&&o.go("clients")})},n.archiveClient=function(e){for(var t=n.clients.length-1;t>=0;t--)if(n.clients[t].id==e)var o=t,s=n.clients[t];s.archive=null==s.archived_by?!0:!1,console.log("C::",s,e,o),c.save(s,function(e){n.filters.archived?$(".client-"+e.id).toggleClass("archived"):n.clients.splice(o,1)})},n.gotoProjects=function(e){t.path("/clients/"+e)},n.filterArchived=function(e){e?(n.filters.archived=!1,n.clients=c.query({archived:n.filters.archived},function(){r(function(){Projects_BindOnhoverEffects()},100)})):(n.filters.archived=!0,n.clients=c.query({archived:n.filters.archived},function(){r(function(){Projects_BindOnhoverEffects()},100)}))},r(function(){LoadFoundation(),All_FilterMenuOpen_Setup()})}).controller("ClientsEditController",function(e,t,o,n,s,i,r){e.checkLoginStatuss();var a=n.clientId||"";t.link=parseInt(a)?"":a,t.client=i.get({id:a}),t.save=function(){t.client.$save(function(e){if(parseInt(a)){for(var o=0;o<t.clients.length;o++)t.clients[o].id==e.id&&(t.clients[o].title=e.title,t.clients[o].color=e.color);r.go("clients")}else e["new"]=!0,t.clients.push(e),r.go("clients")})},s(function(){LoadFoundation()})}).controller("ProjectsController",function(e,t,o,n,s,i,r,a,c,l){e.checkLoginStatuss(),t.loggedinuser=e.get(),t.stateParams=n,t.client=r.get({id:n.clientId},function(e){}),t.projects=a.query({archived:!1,client_id:n.clientId},function(e){s(function(){Projects_BindOnhoverEffects()}),console.log(e)}),t.filters={archived:!1},t.destroy=function(e){a["delete"]({id:e},function(){for(var o=t.projects.length-1;o>=0;o--)t.projects[o].id==e&&t.projects.splice(o,1)})},t.archiveProject=function(e){for(var o=t.projects.length-1;o>=0;o--)if(t.projects[o].id==e)var n=o,s=t.projects[o];s.archive=null==s.archived_by?!0:!1,a.save(s,function(e){t.filters.archived?$(".project-"+e.id).toggleClass("archived"):t.projects.splice(n,1)})},t.gotoProject=function(e){c.path("/clients/"+t.client.id+"/projects/"+e)},t.filterArchived=function(e){e?(t.projects=a.query({client_id:n.clientId,archived:!1},function(e){s(function(){Projects_BindOnhoverEffects()})}),t.filters.archived=!1):(t.projects=a.query({client_id:n.clientId,archived:!0},function(e){s(function(){Projects_BindOnhoverEffects()})}),t.filters.archived=!0)},s(function(){LoadFoundation(),FoundationTabCallbackOverride(),Projects_BindOnhoverEffects(),All_FilterMenuOpen_Setup(),console.log("Scrolling",$(document).scrollTop()),l($(".app-top"))},300)}).controller("ProjectsEditController",function(e,t,o,n,s,i,r,a){e.checkLoginStatuss();var c=n.projectId||"";t.link=parseInt(c)?"":c,t.project=r.get({id:c}),t.save=function(){t.project.client_id=n.clientId,r.save(t.project,function(e){if(parseInt(c)){for(var o=0;o<t.projects.length;o++)t.projects[o].id==e.id&&(t.projects[o].title=e.title);$("#project-edit-modal").foundation("reveal","close")}else console.log("Push project",e),t.projects.push(e),$("#project-edit-modal").foundation("reveal","close")})},t.back=function(){$("#project-edit-modal").foundation("reveal","close")},s(function(){LoadFoundation(),FoundationTabCallbackOverride(),$("#project-edit-modal").foundation("reveal","open"),$(document).on("closed.fndtn.reveal","[data-reveal]",function(){a.go("clients.projects",{clientId:n.clientId})})},300)}).controller("ProjectsOpenController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p){t.checkLoginStatuss();var m=s.projectId||"";o.project=c.get({id:s.projectId},function(e){n.$broadcast("setBreadcrumb",{project:e.title})}),o.syncobject=f,i(function(){AngularTabClickOverride()},100)}).controller("TasksController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m,h){o.checkLoginStatuss(),n.user_filter={search:" "},n.tasks=l.queryTasks({id:i.projectId},function(e){e=_(e).each(function(e,t,o){e.users=[],_(e.taskrolebinds).each(function(t){_(t.users).each(function(t){t.taskrolebinds_id=t.pivot.taskrolebinds_id,e.users.push(t)})})}),r(function(){LoadFoundation(),ProjectsOpen_Display_Setup(),ProjectsOpen_Click_Setup(n),Projects_BindOnhoverEffects(),Tasks_ShowHideDone_Click_Setup()},100)}),n.task={},n.users=f.query(function(e){e=_(e).each(function(e){e.search=e.name+" "+e.surname}),console.log(e)}),n.jobroles=u.query(),n.project=l.get({id:i.projectId},function(e){s.$broadcast("setBreadcrumb",{project:e.title})}),n.$watch("local_user_filter",function(e,t){console.log("Changed")},!0),n.open_task=function(e,o){t.go("project.tasks"),p.get({id:e.id},function(e){angular.copy(e,n.task),console.log("T::",n.task),$("#bind-user-new-modal").foundation("reveal","open"),r(function(){},100)})},n.done_task=function(e,t){var o={id:e,done:t?1:0};p.save(o)},n.try_binding=function(e,t,o){var s=$(e.target);$(s).hasClass("secondary")?($(s).removeClass("secondary"),n.bind_role_user(t,o)):($(s).addClass("secondary"),n.unbind_role_user(t,o)),console.log("DOING BINDING INSIDE!")},n.bind_role_user=function(e,t){var o=t||n.open_rolebind;if("undefined"==typeof o||null==o)return void console.log("Wha?! No Current Rolebind");"undefined"==typeof o.users&&(o.users=[]);for(var s=o.users.length-1;s>=0;s--)if(o.users[s].id==e.id)return void console.log("Wha?! User already is there");f.bindToTask({taskrole:o.id,id:e.id},function(e){o.users.push(e);for(var t=n.tasks.length-1;t>=0;t--)n.tasks[t].id==o.task_id&&n.tasks[t].users.push(e)})},n.unbind_role_user=function(e,t){var o=e.id,s=t.id;console.log(e),f.unbindToTask({taskrole:o,id:s},function(t){_(n.tasks).each(function(e){e.id==n.task.id&&_(e.users).each(function(n,s){n.id==t.id&&n.taskrolebinds_id==o&&e.users.splice(s,1)})});for(var i=e.users.length-1;i>=0;i--)e.users[i].id==s&&e.users.splice(i,1);r(function(){ProjectsOpen_Display_Setup()},200)})},n.filter_focus=function(e){var t=$(e.target).offset(),o=$(e.target).scope();t.top+=$(e.target).parent().height()+2,$("#users-popup").finish().fadeIn(100,function(){}).offset(t),n.open_rolebind=o.rolebind,$(e.target).off("blur").blur(function(){$("#users-popup").finish().fadeOut(100,function(){}),$(this).off("blur"),n.user_filter={},o.local_user_filter={},o.$digest()})},n.filter_change=function(e,t){n.user_filter={search:t.search}},r(function(){},500)}).controller("TasksInfoController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m,h){n.task=f.get({id:i.taskId},function(e){e.original_title=e.title,_(e.taskrolebinds).each(function(e){e.total_m=0,_(e.users).each(function(t){t.total_m=0,_(t.timelogs).each(function(o){e.total_m+=parseInt(o.minutes),t.total_m+=parseInt(o.minutes)})})}),console.log(e)}),n.estimates=l.queryEstimates({id:i.projectId},function(e){_id="undefined"!=typeof e[0]?e[0].id:null,n.new_task={estimate_id:_id}}),n.save_task_info=function(){f.save(n.task,function(e){for(var t=n.tasks.length-1;t>=0;t--)n.tasks[t].id==e.id&&(n.tasks[t].title=e.title);$(".info-edit-row").removeClass("show")})},n.cancel_edit=function(){n.task.title=n.task.original_title,$(".info-edit-row").removeClass("show")},r(function(){Tasks_Info_Show_Edit()},200)}).controller("TasksNewController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m,h){n.loggedinuser=o.get(),n.project=l.get({id:i.projectId}),n.estimates=l.queryEstimates({id:i.projectId},function(e){_id="undefined"!=typeof e[0]?e[0].id:null,n.new_task={estimate_id:_id}}),n.jobroles=h.query({},function(e){n.jobroles.ids=_.pluck(e,"id")}),r(function(){LoadFoundation(),$("#new-task-modal").foundation("reveal","open"),$(document).on("closed.fndtn.reveal","[data-reveal]",function(){t.go("project.tasks")})},200),r(function(){console.log(n.jobroles)},500),n.save_task=function(){n.new_task.project_id=i.projectId,n.new_task.jobroles=n.jobroles.ids,console.log(n.new_task),f.save(n.new_task,function(e){$("#new-task-modal").foundation("reveal","close"),n.task=e,n.task.users=[],n.tasks.push(e),n.bind_role_user(n.loggedinuser,e.taskrolebinds[0])})}}).controller("EstimatesController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m){n.project=l.get({id:i.projectId},function(e){s.$broadcast("setBreadcrumb",{project:e.title})}),n.estimates=l.queryEstimates({id:i.projectId},function(e){n.estimates=_(n.estimates).each(function(e,t,o){e.group=m(e.group),e.bound=_(e.bound).each(function(e){e.group=m(e.group)})}),r(function(){},500)}),n.open_estimate=function(e,o){n.opened_estimate=e,"new"==e?t.go("project.estimates.edit",{estimateId:"new"}):t.go("project.estimates.info",{estimateId:e.id})},n.open_estimate_dbl=function(e,o){console.log("DOUNBLE CLICK!!!"),n.opened_estimate=e,t.go("project.estimates.edit",{estimateId:e.id})},n.close_estimate=function(e){},n.expand_estimate=function(e,t,o){o.stopPropagation();for(var s=n.estimates.length-1;s>=0;s--)if(n.estimates[s].id==t.id)var i=s;for(var s=t.bound.length-1;s>=0;s--)if(t.bound[s].id==e.id)var r=s;t.bound.splice(r,1),n.estimates.splice(i+1,0,e),n.unbind_estimate(e.id)},n.delete_estimate=function(e,t){t.stopPropagation();for(var o=n.estimates.length-1;o>=0;o--)if(n.estimates[o].id==e.id)var s=o;d["delete"]({id:e.id},function(){n.estimates.splice(s,1)})},n.bind_estimate=function(e,t){console.log("bind_estimate"),d.save({id:e,bound_to_estimate_id:t})},n.unbind_estimate=function(e){console.log("unbind_estimate"),d.save({id:e,bound_to_estimate_id:"null"})},n.fullListOptions={handle:".handle",appendTo:".estimate-list",connectWith:".subestimates",helper:"clone",cursorAt:{left:150},start:function(e,t){console.log("Got fullList")},stop:function(e,t){$(".sortable").toggleClass("fix-display")},receive:function(e,t){console.log("Receive fulllist")},over:function(e,t){console.log("Over fullList")}},n.shortListOptions={handle:".handle",appendTo:".subestimates",tolerance:"pointer",forceHelperSize:!0,forcePlaceholderSize:!1,placeholder:"small-drag-placeholder",start:function(e,t){},stop:function(e,t){$(".sortable").toggleClass("fix-display")},receive:function(e,t){$item=$(t.item).find(".estimate").addClass("subestimate");var o=$item.data("estimate-id"),s=$(e.target).parent().find(".estimate").data("estimate-id");n.bind_estimate(o,s)},over:function(e,t){$(e.target).parents(".estimate-page-group").addClass("hover")},out:function(e,t){$(e.target).parents(".estimate-page-group").removeClass("hover")}},n.$on("$stateChangeSuccess",function(e,t,o,n,s){Estimate_SetActive(o.projectId)}),r(function(){LoadFoundation()},100)}).controller("EstimatesInfoController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m){function h(e,t,o){_summLooper=function(e){for(var t=0,n=e.hours.length-1;n>=0;n--)t+=e.hours[n]*o[n];return t},_hoursLooper=function(e){for(var t=0,o=e.hours.length-1;o>=0;o--)t+=e.hours[o];return t};var n=!1;return e.totals={summ:0,hours:0},console.log("New Loop::"),_(t).each(function(t,o,s){t.sortorder>=e.sortorder||(1==t.is_header?n=!0:n||(e.totals.summ+=_summLooper(t),e.totals.hours+=_hoursLooper(t)))}),e}n.selecttypes={list:m(),selected:m(0)},n.estimate=d.get({id:i.estimateId},function(e){e.totals={hours:0,summ:0},e.entries.show=0==e.entries.length,e.expences.show=0==e.expences.length,e.group=m(e.group),e.headers=_(e.entries).where({is_header:1})||{sortorder:9999},0==e.headers.length&&(e.headers=[{sortorder:9999,title:"All Tasks"}]),_(e.headers).each(function(t,o){t=h(t,e.entries,e.involved_roles.salary),e.totals.hours+=t.totals.hours,e.totals.summ+=t.totals.summ}),e.totals.tax_percent="micro"==e.branch.type?.09:.21,e.totals.tax=e.totals.summ*e.totals.tax_percent,r(function(){Estimate_SetActive(n.estimate.id)})},function(){}),r(function(){},500)}).controller("EstimatesNewController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m){n.selecttypes={list:m(),selected:m(0)},r(function(){LoadFoundation(),$("#new-estimate-modal").foundation("reveal","open"),$(document).on("closed.fndtn.reveal","[data-reveal]",function(){console.log("IsSaved::",n.saved_open_estimate),n.saved_open_estimate>-1?(t.go("project.estimates.edit",{estimateId:n.saved_open_estimate}),n.saved_open_estimate=-1):t.go("project.estimates")})},200),n.saved_open_estimate=-1,n.save_open_estimate=function(){n.estimate.project_id=i.projectId,n.estimate.discount=0,n.estimate.group=n.selecttypes.selected.value,d.save(n.estimate,function(e){n.saved_open_estimate=e.id,e.group=m(e.group);var t=n.estimates.push(e);n.opened_estimate=n.estimates[t-1],$("#new-estimate-modal").foundation("reveal","close")})}}).controller("EstimatesEditController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p,m){function _(e,t){this.pushReorderTimeout=this.pushReorderTimeout|!1;var n=0,s=!1,i=0,r=0,a=0;if("undefined"!=typeof e&&"undefined"!=typeof t&&"object"==typeof e[0])for(var c=e.length-1;c>=0;c--)"undefined"!=typeof t[c]&&(e[c].id==t[c].id||s||(s=!0));for(e_idx in o.estimate.entries)for(h_idx in o.estimate.entries[e_idx].hours)r=o.estimate.entries[e_idx].hours[h_idx]||0,a=o.estimate.involved_roles.salary[h_idx]||0,i=r*a,n+=isNaN(i)?0:i;console.log("Total Changed:",n,"nv:",e,"ov:",t,"pr:",s),o.tasks_total=0==n&&"undefined"!=typeof o.tasks_total?o.tasks_total:n,s&&(this.pushReorderTimeout&&clearTimeout(this.pushReorderTimeout),this.pushReorderTimeout=setTimeout(function(){u.saveOrder({objectarray:e})},500))}function h(e){return parseInt(e);return e%5>=2.5?5*parseInt(e/5)+5:5*parseInt(e/5)}e.checkLoginStatuss(),o.project=c.get({id:s.projectId},function(e){n.$broadcast("setBreadcrumb",{project:e.title})}),o.selecttypes={list:p(),selected:p(0)},o.estimate=d.get({id:s.estimateId},function(e){e.entries.show=0==e.entries.length,e.expences.show=0==e.expences.length,e.group=p(e.group),console.log(e),i(function(){Projects_BindOnhoverEffects(".context-menu")})},function(){}),o.jobroles=l.query(),o.syncobject=m,console.log("Estimate:",o.estimate),o.$watch("estimate.entries",_,!0),o.$watch("estimate.involved_roles.salary",_,!0),o.$watch("estimate.expences",function(e,t){var n=0,s=0;for(e_idx in o.estimate.expences)s=o.estimate.expences[e_idx].qty*o.estimate.expences[e_idx].price,n+=isNaN(s)?0:s;for(ex_bind_idx in o.estimate.bound_estimates)n+=o.estimate.bound_estimates[ex_bind_idx].total.expences;o.exp_total=n},!0),o.open_groups=function(){},o.save=function(e){var e=e|!0;o.estimate.group=o.estimate.group.value,o.estimate.total_summ=o.tasks_total,d.save(o.estimate,function(t){t.group=p(t.group),o.estimate=t,"undefined"!=typeof o.opened_estimate&&(o.opened_estimate.group=t.group,o.opened_estimate.title=t.title,o.opened_estimate.total_summ=t.total_summ),e&&$("#new-estimate-modal").foundation("reveal","close")})},o.back=function(){r.path("clients/"+s.clientId+"/projects/"+s.projectId)},o.add_task=function(e){if("undefined"==typeof e)console.error("Please be careful! There is no task to add!");else{e.estimate_id=s.estimateId,e.hours=[],e.is_header=!0;for(var t=0;t<o.estimate.involved_roles.id.length;t++)e.hours.push(0);u.save(e,function(e){e.is_header=!1,o.estimate.entries.push(e),o.estimate.entries.show=!1,i(function(){EstimateEdit_JobRoles_Events_Setup(o),Projects_BindOnhoverEffects("td.handle"),$("input[data-entryid="+e.id+"].title-input").focus()},100)}),o.new_task=null}},o.remove_task=function(e,t){u["delete"]({id:e.id}),o.estimate.entries.splice(t,1),o.estimate.entries.show=0==o.estimate.entries.length},o.changeHours=function(e,t,o){var n=parseFloat(e.toString().replace(",",".")).toFixed(2);o.hours[t]=h(100*n)/100,console.log("Change Hour::",o.hours,n),u.save(o)},o.changeTaskname=function(e){u.save(e)},o.add_exp=function(e){"undefined"==typeof e?console.error("Please be careful! There is no expence to add!"):(o.estimate.expences.show=!1,e.estimate_id=o.estimate.id,o.estimate.expences.push(f.save(e,function(e){i(function(){EstimateEdit_Expences_Events_Setup(o),$("input[data-expid="+e.id+"].title-input").focus()},100)})),o.new_exp=null)},o.remove_exp=function(e,t){f["delete"]({id:e.id}),o.estimate.expences.splice(t,1),o.estimate.expences.show=0==o.estimate.expences.length},o.changeExp=function(e){f.save(e)},o.open_bind_estimates=function(e){$("#bound-other-estimates-modal").foundation("reveal","open")},o.close_bind_estimates=function(){$("#bound-other-estimates-modal").foundation("reveal","close")},o.update_estimates=function(){d.get({id:s.estimateId},function(e){e.tasks.show=0==e.tasks.length,e.expences.show=0==e.expences.length,e.group=p(e.group),angular.copy(e,o.estimate)}),c.get({id:s.projectId},function(e){angular.copy(e,o.project),i(function(){EstimateEdit_BindEstimates_Events_Setup(o)},400)}),console.log(o.estimate)},o.setHeader=function(e,t){for(var o=e.hours.length-1;o>=0;o--)e.hours[o]=0;e.is_header=t,u.save(e)},o.estimateTypeHelper=function(e){var t=p(e);return t.name},o.sortableOptions={handle:".handle",delay:150,forceHelperSize:!0,forcePlaceholderSize:!1,stop:function(e,t){$(".sortable").toggleClass("fix-display"),$(".button-group").removeClass("show")}},i(function(){LoadFoundation(),FoundationTabCallbackOverride(),$("#new-estimate-modal").foundation("reveal","open"),$(document).on("closed.fndtn.reveal","[data-reveal]",function(){o.save(!1),t.go("project.estimates")}),angular.element(document).ready(function(){console.log("IsReady::EstimatesEditController"),EstimateEdit_JobRoles_Events_Setup(o),EstimateEdit_Expences_Events_Setup(o),EstimateEdit_BindEstimates_Events_Setup(o)})},500)}).controller("TasksMyController",function(e,t,o,n,s,i,r,a,c,l,d,u,f){e.checkLoginStatuss(),lastrefresh=moment(),Auth=e.get(function(){o.user=a.get({id:Auth.id},function(e){_(e.taskroles).each(function(e){e.search=e.task.project.client.title+" "+e.task.project.title+" "+e.task.title}),console.log("Got User Data"),i(function(){LoadFoundation()},200)})}),o.projects=u.query(),o.jobroles=c.query();var p=moment(),m=[p.startOf("isoWeek")];m[0].weekend=!1,m[0].today=m[0].isSame(moment(),"day");for(var h=1;7>h;h++)m.push(m[h-1].clone().add("d",1)),m[h].weekend=6==m[h].day()||0==m[h].day()?!0:!1,m[h].today=m[h].isSame(moment(),"day");o.week=m,o.hours=0,console.log("Made Week",s.weekOffset),o.open_log_select=function(e){n.passobject=e,console.log("PO1",n.passobject),e.day.weekend||$(".app-time-select-modal").foundation("reveal","open")},o.close_log_select=function(){$("#time-select-modal").foundation("reveal","close"),delete n.passobject},o.add_log=function(){var e=60*parseInt(o.hours)+parseInt(o.minutes),t=n.passobject;console.log("PO2",t),t.day.weekend||(Auth.loggedin?(timelog=l.save({id:t.timelog.id,user_id:Auth.id,taskrole_id:t.taskrole.id,time:t.day,minutes:e,comment:t.comment}),t.timelog.id?(t.taskrole.usertimelogs[t.timelog.index].minutes=e,t.taskrole.usertimelogs[t.timelog.index].comment=t.comment):t.taskrole.usertimelogs.push(timelog),o.close_log_select()):console.error("This is weard.. how did you get this far without logging in?"))},o.add_rouge_task=function(){try{o.newTask.jobroles=[o.newTask.jobroles_o.id],o.newTask.project_id=o.fuzzy.selected,d.save(o.newTask,function(e){$("#user-add-new-task-modal").foundation("reveal","close"),a.bindToTask({id:Auth.id,taskrole:e.jobroles[0].pivot.id},function(){a.get({id:Auth.id},function(e){angular.copy(e,o.user)})})},function(){throw"Something went wrong"})}catch(e){$(".app-user-add-new-task-modal .modal-error-area").fadeOut(0).html("<h5>There was an Error!</h5><p>Please Check if all the fields are filled...</p>").fadeIn(400)}},o.open_task_add=function(){$("#user-add-new-task-modal").foundation("reveal","open")},o.refresh_fuzzysearch=function(){$(".app-user-add-new-task-modal .fuzzy-searchresults table").fadeIn(200),o.fuzzy.result=o.Fuse.search(o.fuzzy.searchstring)},o.set_fuzzysearch=function(e){$(".app-user-add-new-task-modal .fuzzy-searchresults table").fadeOut(200),$(".app-user-add-new-task-modal .postfix").addClass("success").find("i").fadeIn(200),o.fuzzy.searchstring=e.client.title+" "+e.title,o.fuzzy.selected=e.id},o.resolve_task_offset=function(e){if(n.weekOffset||(n.weekOffset=0),0==e)var o=0;else var o=n.weekOffset+e;t.go("tasks.list",{weekOffset:o})},i(function(){LoadFoundation(),DashboardMy_Dragger_Setup(o),console.log("Loaded Foundation")},500)}).controller("TasksMyListController",function(e,t,o,n,s,i,r,a,c,l,d,u,f){e.checkLoginStatuss(),lastrefresh=moment(),o.projects=u.query(),o.jobroles=c.query(),n.weekOffset=parseInt(s.weekOffset),console.log("Made NOW::",n.weekOffset);var p=moment().add(parseInt(s.weekOffset),"weeks"),m=[p.startOf("isoWeek")];m[0].weekend=!1,m[0].today=m[0].isSame(moment(),"day");for(var _=1;7>_;_++)m.push(m[_-1].clone().add("d",1)),m[_].weekend=6==m[_].day()||0==m[_].day()?!0:!1,m[_].today=m[_].isSame(moment(),"day");o.week=m,o.hours=0,o.open_log_select=function(e){n.passobject=e,console.log("PO1",n.passobject),e.day.weekend||$(".app-time-select-modal").foundation("reveal","open")},o.close_log_select=function(){$("#time-select-modal").foundation("reveal","close"),delete n.passobject},o.add_log=function(){var e=60*parseInt(o.hours)+parseInt(o.minutes),t=n.passobject;console.log("PO2",t),t.day.weekend||(Auth.loggedin?(timelog=l.save({id:t.timelog.id,user_id:Auth.id,taskrole_id:t.taskrole.id,time:t.day,minutes:e,comment:t.comment}),t.timelog.id?(t.taskrole.usertimelogs[t.timelog.index].minutes=e,t.taskrole.usertimelogs[t.timelog.index].comment=t.comment):t.taskrole.usertimelogs.push(timelog),o.close_log_select()):console.error("This is weard.. how did you get this far without logging in?"))},o.add_rouge_task=function(){try{o.newTask.jobroles=[o.newTask.jobroles_o.id],o.newTask.project_id=o.fuzzy.selected,d.save(o.newTask,function(e){$("#user-add-new-task-modal").foundation("reveal","close"),a.bindToTask({id:Auth.id,taskrole:e.jobroles[0].pivot.id},function(){a.get({id:Auth.id},function(e){angular.copy(e,o.user)})})},function(){throw"Something went wrong"})}catch(e){$(".app-user-add-new-task-modal .modal-error-area").fadeOut(0).html("<h5>There was an Error!</h5><p>Please Check if all the fields are filled...</p>").fadeIn(400)}},o.open_task_add=function(){$("#user-add-new-task-modal").foundation("reveal","open")},o.refresh_fuzzysearch=function(){$(".app-user-add-new-task-modal .fuzzy-searchresults table").fadeIn(200),o.fuzzy.result=o.Fuse.search(o.fuzzy.searchstring)},o.set_fuzzysearch=function(e){$(".app-user-add-new-task-modal .fuzzy-searchresults table").fadeOut(200),$(".app-user-add-new-task-modal .postfix").addClass("success").find("i").fadeIn(200),o.fuzzy.searchstring=e.client.title+" "+e.title,o.fuzzy.selected=e.id},i(function(){DashboardMy_Dragger_Setup(o)},500)}).controller("PlanerController",function(e,t,o,n,s,i,r,a,c,l,d,u,f){e.checkLoginStatuss(),i(function(){LoadFoundation()},500)}).controller("ReportController",function(e,t,o,n,s,i,r,a,c,l){e.checkLoginStatuss(),t.total={done_m:0,sold_m:0},r.getProjects(function(e){for(key in e)isNaN(parseInt(key))||(t.total.done_m+=e[key].done_m,t.total.sold_m+=e[key].sold_m);t.projectList=e,s(function(){Dashboard_OnClick_Setup()},100)}),r.getAllEstimates(function(e){t.estimatesList=e,DashboardCascade_OnClick_Setup()}),t.users=a.query(function(e){});var d=moment().add(parseInt(0),"weeks"),u=[d.startOf("isoWeek")];u[0].weekend=!1,u[0].today=u[0].isSame(moment(),"day");for(var f=1;7>f;f++)u.push(u[f-1].clone().add("d",1)),u[f].weekend=6==u[f].day()||0==u[f].day()?!0:!1,u[f].today=u[f].isSame(moment(),"day");t.week=u,t.hours=0,t.refreshProject_Details=function(e,o){if($(".project-details.clone").remove(),$(e.currentTarget).parent("tr").hasClass("project-open")){var n=$(".project-details");n.addClass("closed"),$(e.currentTarget).parent("tr").removeClass("project-open")}else $(e.currentTarget).parents("table").find(".project-open").removeClass("project-open"),$(e.currentTarget).parent("tr").addClass("project-open"),$details_clone=$(".real .project-details.loading").clone(),$details_clone.removeClass("open").addClass("closed clone"),$(e.currentTarget).parent("tr").after($details_clone),$details_clone.removeClass("closed").addClass("open");t.project=r.getTaskroles({id:o},function(e){s(function(){var e=$(".real .project-details");$details_clone.html(e.html()).removeClass("loading"),DashboardCascade_OnClick_Setup()},200)})},t.taskinfo=function(e,t){var o=t.id;s(function(){if(null!=t.estimate_id)var n=$(e.currentTarget).data("selector"),s=c.getFullInfo({id:o},function(){var e="<table>";e+='<tr><td class="col1"> Client: </td><td class="col2">',e+=s.estimate.project.client.title,e+="</td></tr>",e+='<tr><td class="col1"> Project: </td><td class="col2">',e+=s.estimate.project.title,e+="</td></tr>",e+="</table>",e+='<span class="nub"></span>',$('.tooltip[data-selector="'+n+'"]').html(e)});else{var n=$(e.currentTarget).data("selector"),i="<div>You Added this task..</div>";i+='<span class="nub"></span>',$('.tooltip[data-selector="'+n+'"]').html(i)}},400)},s(function(){LoadFoundation(),AngularTabClickOverride()},500)}).controller("ReportClentsController",function(e,t,o,n,s,i,r,a,c,l){e.checkLoginStatuss(),r.query({name:"clients"},function(e){t.clients=e})}).controller("ReportDashboardController",function(e,t,o,n,s,i,r,a,c,l){e.checkLoginStatuss(),r.getChartData(function(e){t.chartdata=e,Dashboard_D3(t)}),s(function(){LoadFoundation(),AngularTabClickOverride()},500)}).controller("ReportUsersController",function(e,t,o,n,s,i,r,a,c,l){e.checkLoginStatuss(),t.users=a.query(function(){s(function(){Reports_users_Click_Setup(t)},100)}),t.open_user=function(e,o){var n=a.get({id:e},function(e){});s(function(){t.user=n,t.user.group=1},200)},s(function(){LoadFoundation()},500)}).controller("ReportBonusController",function(e,t,o,n,s,i,r,a,c,l,d,u,f){var p=.2;e.checkLoginStatuss(),"undefined"==typeof t.loading&&(t.loading=0),t.clients=d.query(),t.date_options={};var m=function(e,o){console.log("watcher_fnc::newValue==",e),e>=1||e>=1-p&&(console.log("watcher_fnc::do math"),s(function(){t.doTheMath(),t.loading=Reports_bonus_Dragger_Setup(p),s(function(){console.log("watcher_fnc::show user-picture-row"),Reports_bonus_D3(),$(".user-picture-row").delay(1e3).fadeIn(500)},100)},500))};t.$watch("loading",m,!0),t.doTheMath=function(){console.groupCollapsed("doTheMath"),console.log("$scope.projectsWithHours",t.projectsWithHours),console.log("$scope.userhours",t.userhours),console.groupCollapsed("doTheMath::project details");for(prject_id in t.projectsWithHours){if(console.groupCollapsed("Project::"+prject_id),"undefined"!=typeof t.userhours[prject_id])if(t.userhours[prject_id].length>0){for(var e={},o=t.userhours[prject_id].length-1;o>=0;o--){var n=t.userhours[prject_id][o].jobrole_id,s=parseInt(t.userhours[prject_id][o].minutes);"undefined"!=typeof e[n]?e[n]+=s:e[n]=s}console.log(prject_id,"totalWork::",e);for(var i=t.userhours[prject_id].length-1;i>=0;i--){var r=t.userhours[prject_id][i].user_id,n=t.userhours[prject_id][i].jobrole_id,s=parseInt(t.userhours[prject_id][i].minutes),a=t.projectsWithHours[prject_id].sold_m[n]||0,c=s/e[n]||0,l=a*c;console.log(" ","[j_id]::",n),console.log(" ","totalWork[j_id]::",e[n]),console.log(" ","min::",s),console.log(" ","percent::",c),console.log(" ","sold_min::",a),console.log(" ","all_sold_min::",t.projectsWithHours[prject_id].sold_m),console.log(" ","sold_min_share::",l),console.log(" -----------------------------"),console.log("user_id::",r,"$scope.users::",t.users);var d=n;"undefined"!=typeof t.users[r]&&("undefined"!=typeof t.users[r].sold_m[d]?t.users[r].sold_m[d]+=l:t.users[r].sold_m[d]=l,"undefined"!=typeof t.users[r].done_m[d]?t.users[r].done_m[d]+=s:t.users[r].done_m[d]=s)}}else console.log("empty");console.groupEnd()}console.groupEnd(),_(t.users).each(function(e){var t=_.chain(e.sold_m).reject(function(e,t){return 1==t}).size().value(),o={};for(key in e.sold_m)o[key+"a"]=e.sold_m[key],o[key+"b"]=e.done_m[key]-e.sold_m[key];if(t>1){o["9a"]=0,o["9b"]=0;for(key in e.sold_m)o["9a"]+=e.sold_m[key],o["9b"]+=e.done_m[key];o["9b"]-=o["9a"]}e.json=o,_(e.sold_m).each(function(t,o){if("undefined"!=typeof e.json["9a"]&&"undefined"==typeof e.percent[9]){var n=e.json["9a"]/(e.json["9b"]+e.json["9a"]);console.log("BLA::",n,e.json["9a"],e.json["9b"]),e.percent[9]=e.json["9a"]/(e.json["9b"]+e.json["9a"])*100,e.sold_m[9]=e.json["9a"]}var s="undefined"!=typeof e.done_m[o]?t/e.done_m[o]:0;e.percent[o]=100*s}),e.jobrolecount=_.chain(e.sold_m).reject(function(e,t){return 1==t}).size().value(),console.log("json",e)}),console.groupEnd()},t.startQuery=function(){if("undefined"!=typeof t.e_date&&"undefined"!=typeof t.s_date){$(".dashboard-bonus .filter-date-display").text(""),$(".app-date-filter-modal").foundation("reveal","close"),$(".dashboard-bonus .button-group .secondary").removeClass("secondary"),$(".loading-row div").show(),$(".loading-row").fadeIn(300);var e=moment(t.e_date),o=moment(t.s_date);t.date_period=e.diff(o,"days")>363?115200:8*e.diff(o,"days")*60,$(".dashboard-bonus .filter-date-display").text(""+o.format("DD-MM-YYYY")+" -> "+e.format("DD-MM-YYYY")),a.query(function(e){for(var o=e.length-1;o>=0;o--)e[o].sold_m={},e[o].done_m={},e[o].percent={};t.users=_(e).indexBy("id"),console.log("Users",t.users),t.loading=Reports_bonus_Dragger_Setup(p)}),l.query(function(e){t.jobroles=_(e).indexBy("id"),t.loading=Reports_bonus_Dragger_Setup(p)}),r.query({name:"userhours",e_date:e.toString(),s_date:o.toString()},function(e){t.userhours=_(e).groupBy("projects_id"),t.loading=Reports_bonus_Dragger_Setup(p)}),r.query({name:"getestimates"},function(e){t.pm_sold_hours=e[0]}),c.getEstimates({e_date:e.toString(),s_date:o.toString()},function(e){t.projectsWithHours=_(e).indexBy("id"),t.loading=Reports_bonus_Dragger_Setup(p)})}},t.saveCompiledData=function(){var e=_(t.users).map(function(e){return _(e).pick("sold_m","id")});console.log("F::",t.users,e),u.save({app_name:"BonusSystem",data:""})},t.openModal=function(){$(".custom-date-row").fadeOut(0),$(".app-date-filter-modal").foundation("reveal","open")},t.thisYear=function(){t.e_date=moment(),t.s_date=moment("2015-01-01 00:00:00"),t.startQuery()},t.lastYear=function(){t.e_date=moment("2014-12-31 00:00:00"),t.s_date=moment("2014-01-01 00:00:00"),t.startQuery()},t.customDate=function(){$(".custom-date-row").fadeIn(300)},s(function(){LoadFoundation(),$(".custom-date-row").fadeOut(0),$(".app-date-filter-modal").foundation("reveal","open")},500)}).controller("ReportProjectsController",function(e,t,o,n,s,i,r,a,c,l,d,u,f,p){var m=s.projectId;o.chartdata=a.getProjectOverView({id:m},function(e){e.project_overview=[];var t=_.chain(e.project_overview_raw).each(function(e){e.time=moment(e.time).format("YYYY-MM-DD")}).groupBy("time").each(function(e,t,o){o[t]=_(e).indexBy("jobrole_id")}).value(),o=_.chain(e.project_overview_raw).pluck("time").uniq().value(),n=_.chain(e.project_overview_raw).pluck("jobrole_id").uniq().value();e.project_overview_time.done={},_(n).each(function(n){var s=[n],i=0;_(o).each(function(e){if("undefined"==typeof t[e][n])s.push(null);else{var o=parseInt(t[e][n].minutes);s.push(o),i+=o}}),e.project_overview.push(s),e.project_overview_time.done[n]={id:n,minutes:i}}),e.project_overview_time_graph=[],rolenames={1:"PV",2:"Radošais direktors",3:"Tekstu autors",4:"Dizaineris",5:"Maketētājs",6:"Programmētājs"},_(rolenames).each(function(t,o){var n={Sold:"undefined"==typeof e.project_overview_time.sold[o]?0:e.project_overview_time.sold[o].minutes,Done:"undefined"==typeof e.project_overview_time.done[o]?0:e.project_overview_time.done[o].minutes,name:t};e.project_overview_time_graph.push(n)}),o.unshift("x"),e.project_overview.unshift(o),console.log("data",e)}),o.project=a.getTaskroles({id:m},function(e){i(function(){Dashboard_D3_SingleProject(o)},500)})}).controller("UsersController",function(e,t,o,n,s,i,r,a){e.checkLoginStatuss(),n.stateParams=i,n.users=a.query(function(){r(function(){Projects_BindOnhoverEffects()
},100)}),n.destroy=function(e){var t=n.clients[e].id;Clients["delete"]({id:t},function(){n.clients.splice(e,1),o.params.clientId==t&&o.go("clients")})},n.gotoProjects=function(e){t.path("/clients/"+e)},r(function(){LoadFoundation()})}).controller("UsersProfileController",function(e,t,o,n,s,i,r,a){n.password={one:"",two:"",error_nomatch:!1,error_noentered:!1},n.groups=[{id:0,title:"User"},{id:1,title:"Project Manager"}],n.$watch("password",function(e,t){n.password.error_nomatch=e.one!=e.two&&e.one.length>0&&e.two.length>0?!0:!1},!0),n.user=a.get({id:i.userId},function(){r(function(){Projects_BindOnhoverEffects()},100)}),n.save=function(){n.password.error_nomatch||n.password.error_noentered||(n.password.one.length>0&&(n.user.password=n.password.one),""==n.user.pict&&(n.user.pict="junck"),a.save(n.user,function(e){if("undefined"==typeof n.user.id)n.users.push(e);else for(var t=n.users.length-1;t>=0;t--)n.users[t].id==e.id&&(n.users[t].name=e.name,n.users[t].surname=e.surname);o.go("users")}))}}).controller("AppsController",function(e,t,o,n,s,i,r,a){n.apps=a.getAppList()}).controller("SettingsController",function(e,t,o,n,s,i,r,a){e.checkLoginStatuss()}).controller("BusinessInfoController",function(e,t,o,n,s,i,r,a,c){e.checkLoginStatuss(),s.branches=t.query(function(e){})}).controller("BusinessInfoEditController",function(e,t,o,n,s,i,r,a,c){e.checkLoginStatuss(),s.branch=t.get({id:n.params.id},function(){a(function(){LoadFoundation()},100)}),s.save=function(){t.save(s.branch,function(e){for(var t=!1,o=s.branches.length-1;o>=0;o--)s.branches[o].id==e.id&&(s.branches[o].title=e.title,t=!0);t||s.branches.push(e),n.go("settings.businessinfo")})},a(function(){})}).controller("ExitController",function(e,t,o,n,s,i){e.checkLoginStatuss(),s(function(){e404Loaded()})}).controller("ManualController",function(e,t,o,n,s,i){e.checkLoginStatuss(),s(function(){ManualsLoaded()})}).controller("e404Controller",function(e,t,o,n,s,i){e.checkLoginStatuss(),s(function(){e404Loaded()})}).controller("BreadCrumbs",function(e,t,o,n,s){e.checkLoginStatuss(),t.$watch("translatedIds",function(e,o){for(idx in t.url)for(new_idx in e)-1!=t.url[idx].context.search(new_idx)&&(t.url[idx].name=e[new_idx])},!0),t.$on("$locationChangeStart",function(){t.translatedIds={};var e=n.path().split("/"),o="/#";t.url=[];for(key in e)""!=e[key]&&(o+="/"),o+=e[key],name=e[key],context="",isNaN(parseInt(e[key]))||(context=e[key-1]),t.url.push({name:name,context:context,href:o,disabled:"edit"==e[key]||"new"==e[key]?!0:!1})}),t.$on("setBreadcrumb",function(e,o){for(idx in o)t.translatedIds[idx]=o[idx]}),s(function(){},0)}).controller("profile_controller",function(e,t,o,n,s){t.me=e.get()});
//# sourceMappingURL=./controllers-ck.js.map