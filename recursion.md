Sometimes you have to recurse inside loops this happens when you have a 
set of inputs that you would try and based on those inputs you would recursively try
other solution if a recursive solution based on i=0 doesnt work you return back and loop moves forward
and you try your recursive solution on i=1;

The first one might work on i=0, second call might work on i=3, third fail at all i values so you come back
to second call and increment i=4 and make a recursive call on that.

When you are asked to reverse something. Always think of where you could fit a stack.

Always see if you can divide and conquer a problem.
