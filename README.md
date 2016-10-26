# LucidityBotApp


okay let's work out some stats we can serve!

currently complete:
Most Active users.
Most used words.
Users who bug the streamer the most.

currently in progress/partially complete:
Stats about a particular user. Currently returns messagecount for a particular user but getting multiple stats would be cool.

ideas we can add:

Responsiveness/mobile friendliness is a cool feature
Auth is underway, 90% complete
So much styling!

updates for Commands Table:
scrollable list? pages of commands? giant wall of commands is not terribly approachable
scheduled command implementation + list of them
restful routes for commands

updates for stats page:
I want more graphs and more varied graphs!


stats page:
individual user stats
channel stats (seperate routes?)

home page:
welcome message

commands page:
create table of commands

There's a bug with the scheduled commands currently: when one is removed, the
display of the frequency for the others breaks in some as yet unexplored way.

many functions need to be converted to es6, and the jquery stuff needs to be moved to superagent. goals for weds!
