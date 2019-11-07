[33mcommit 328b1d5b5353753178ab5c17b608d7f111042410[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Author: Koushik <koushik.rjn@gmail.com>
Date:   Thu Nov 7 14:17:45 2019 +0530

    UI Changes

[1mdiff --git a/static/css/w3.css b/static/css/w3.css[m
[1mindex e73d269..0130866 100644[m
[1m--- a/static/css/w3.css[m
[1m+++ b/static/css/w3.css[m
[36m@@ -34,8 +34,8 @@[m [mhr{border:0;border-top:1px solid #eee;margin:20px 0}[m
 .w3-bordered tr,.w3-table-all tr{border-bottom:1px solid #ddd}.w3-striped tbody tr:nth-child(even){background-color:#f1f1f1}[m
 .w3-table-all tr:nth-child(odd){background-color:#fff}.w3-table-all tr:nth-child(even){background-color:#f1f1f1}[m
 .w3-hoverable tbody tr:hover,.w3-ul.w3-hoverable li:hover{background-color:#ccc}.w3-centered tr th,.w3-centered tr td{text-align:center}[m
[31m-.w3-table td,.w3-table th,.w3-table-all td,.w3-table-all th{padding:8px 8px;display:table-cell;text-align:left;vertical-align:top}[m
[31m-.w3-table th:first-child,.w3-table td:first-child,.w3-table-all th:first-child,.w3-table-all td:first-child{padding-left:16px}[m
[32m+[m[32m.w3-table td,.w3-table th,.w3-table-all td,.w3-table-all th{padding:6px 6px;display:table-cell;text-align:left;vertical-align:top}[m
[32m+[m[32m.w3-table th:first-child,.w3-table td:first-child,.w3-table-all th:first-child,.w3-table-all td:first-child{/*padding-left:16px*/}[m
 .w3-btn,.w3-button{border:none;display:inline-block;padding:8px 16px;vertical-align:middle;overflow:hidden;text-decoration:none;color:inherit;background-color:inherit;text-align:center;cursor:pointer;white-space:nowrap}[m
 .w3-btn:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)}[m
 .w3-btn,.w3-button{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}   [m
[1mdiff --git a/templates/new_test.html b/templates/new_test.html[m
[1mindex 5b634b8..89f73eb 100644[m
[1m--- a/templates/new_test.html[m
[1m+++ b/templates/new_test.html[m
[36m@@ -170,11 +170,19 @@[m [mScan solution with cloud service for better document management</title>[m
 							<tbody>														[m
 								<tr class="w3-center">[m
 									<td class="w3-center">[m
[31m-										<button class="w3-section w3-button w3-border w3-medium w3-padding w3-center w3-margin w3-round-xlarge w3-light-green"  id="todayreport" >Trash Report</button>[m
[31m-										<button class="w3-section w3-button w3-border w3-medium w3-padding w3-center w3-margin w3-round-xlarge w3-light-green"  id="scantodayreport" >Today's Report</button>[m
                                         <button class="w3-section w3-button w3-border w3-medium w3-padding w3-center w3-margin w3-round-xlarge w3-light-green"  id="allreport" >All Report</button>[m
 									</td>									[m
[31m-								</tr>															[m
[32m+[m								[32m</tr>[m
[32m+[m[32m                                <tr class="w3-center">[m
[32m+[m									[32m<td class="w3-center">[m
[32m+[m										[32m<button class="w3-section w3-button w3-border w3-medium w3-padding w3-center w3-margin w3-round-xlarge w3-light-green"  id="scantodayreport" >Today's Report</button>[m
[32m+[m									[32m</td>[m[41m									[m
[32m+[m								[32m</tr>[m
[32m+[m[32m                                <tr class="w3-center">[m
[32m+[m									[32m<td class="w3-center">[m
[32m+[m										[32m<button class="w3-section w3-button w3-border w3-medium w3-padding w3-center w3-margin w3-round-xlarge w3-light-green"  id="todayreport" >Trash Report</button>[m
[32m+[m									[32m</td>[m[41m									[m
[32m+[m								[32m</tr>[m[41m        [m
 							</tbody>[m
 						</table>									[m
 						</div>	[m
