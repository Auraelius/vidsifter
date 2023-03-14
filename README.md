# vidsifter

Developing electron app that allows one to watch all the videos in a folder and keep or
discard them. 

*(For example, if you set the sensitivity on your trail camera too
high and get hundreds of short videos  of just leaves falling and have to watch
them one after another just to find the fox
you were looking for. Stay tuned for a version where we use the OpenAi chat to
write code to
use the OpenAI API to look
for the fox with me. :-)*

***Co-written with ChatGPT-4 as an experiment.***

The code has currently been generated by a series of conversational prompts to
ChatGPT using the gpt-4 model. I've edited the code as i would following a
series of blog posts, or an interactive class asking the tool to change aspects of the program, adding
features or correcting misapprehensions. I have not written or modified any code
by hand.

So far the code works each time, unlike gpt-3.5. I don't know enough about
electron (this is my first work with the framework) to know if the code is any
good. But, even i can tell that the code doesn't check its inputs or check for
errors, much less handle them. Then again, we haven't discussed those aspects yet. It's
fragile code, like you'd expect from a blog post.

I haven't tried generating tests for this code. Creating unit tests with common
tools like mocha and chai was 90% ok with gpt-3.5, so I expect this to exceed
that assistance.

This version is good enough to use as I sift through my trailcam videos so I'm
saving a version here.

# Can you license plagiarism?

I don't know much about law, but it seems silly to try and claim ownership of
this code and thus license it. So this code has no author (just a coach) and no license.

# Prompts so far

Not shown here, but i tried to prompt ChatGPT-3.5 with a complete spec of the same
program. Very similar text as appears below, but a description of the final
iteration, as complete as I could make it.  it could not
handle it, crashing the conversation a few lines into the first file. Also, since conversations crashed so often I had to keep feeding its
own code back to it. As you'll see below, ChatGPT-4 does good jobs of not crashing and
referring back to previous example code. Much more convenient.

I didn't save commits for the various iterations, I'm afraid, and I'm not going
to repeat the code here. When you see `{code block}` it represents a window with
the file contents.

## Iteration 1
__*I need help writing a node & electron application that must run on mac os. It needs to prompt for a file, check to make sure it is a video file, then play the video in a loop. please describe the steps I should take to construct this program and include code examples for all files.*__

To create an Electron application that runs on macOS, prompts for a video file, checks if it's a video, and then plays it in a loop, follow these steps:

Set up the project structure and install dependencies.

First, create a new directory for your project and initialize a Node.js project:

{code block}

Create your renderer process script.

Create a new file named renderer.js in your project's root folder. This script will handle file selection and video playback.

{code block}

Create the HTML file.

Create a new file named index.html in your project's root folder. This file will be the user interface for your application.

{code block}

Run the application.
To start your Electron application



***auraelius@gmail.com
please continue***

, run the following command in your terminal:

{code block}

This will launch the Electron application. Click the "Select Video File" button to open a file dialog. Choose a video file with one of the supported extensions (mkv, avi, mp4, mov, flv, or wmv), and the video will start playing in a loop.

Here's a summary of the project structure:

```
electron-video-loop/
├── index.html
├── main.js
├── package.json
├── renderer.js
└── node_modules/
```
These steps guide you through creating a basic Electron application that runs on macOS, allows users to select a video file, checks if it's a valid video file, and plays it in a loop. You can further customize the application to meet your requirements or expand the features if needed.




***auraelius@gmail.com
that was very good. i thought you lost it there, but you finished. thank you***

You're welcome! I'm glad I could help you. If you have any more questions or need further assistance, please don't hesitate to ask. Good luck with your Electron application!

## Iteration 2

***auraelius@gmail.com
I have the files from your previous description working. Now, let's add new
functionality.***

***the next version of the program should 1) prompt for a file, 2) play the file, 3) display two buttons, "keep" and "discard". If the user clicks on the "keep" button, the video playback stops, the video is removed from the display. the video file is moved to a subfolder with the same name of the button, called "keep".  If the user clicks on the "discard" button, the video playback stops, the video is removed from the display the video file is moved to a subfolder with the same name of the button, called "discard".***

***How would I modify the previous example files to add this functionality?***

To implement the new functionality, follow these steps:

Create the "keep" and "discard" subfolders in your project folder.

{code block}

Modify the renderer.js file to handle the "keep" and "discard" button events.


{code block}

Now, when you select a video file, it will play in a loop as before. However, there are now two buttons: "keep" and "discard". When you click one of these buttons, the video playback will stop, the video will be removed from the display, and the video file will be moved to the corresponding subfolder ("keep" or "discard").

Please note that moving files might require administrator privileges or file access permissions depending on the source and destination folders. If you encounter any issues, make sure to check the folder permissions.

## Iteration 3

***auraelius@gmail.com
that's good. but instead of having the "keep" and "discard" folders in the
project directory, they should be in the same folder as the selected file. and
if they don't exist, the program should create them. how would I modify the
example files to accomplish this?***


To create the "keep" and "discard" folders in the same directory as the selected file and create them if they don't exist, you can make the following modifications to the renderer.js file:

Modify the moveFile function in renderer.js to create the "keep" and "discard"
folders in the same directory as the selected file.

{code block}

Now, when you click the "keep" or "discard" button, the program will create the corresponding folder in the same directory as the selected file if it doesn't already exist. The video file will then be moved to the appropriate folder.

The rest of the files remain unchanged. This modification should achieve the desired functionality.


## Iteration 4
***auraelius@gmail.com
very good. this works. our next change is to start with a windows size that make
all the user interface elements, the buttons and the player, visible. how would
i do that?***


To ensure that all user interface elements are visible when the application starts, you can adjust the initial window size in the main.js file. Additionally, you can set a minimum window size to prevent resizing the window too small, which could hide some elements.

Modify the createWindow function in the main.js file to set the initial window
size and minimum window size:

{code block}

To ensure that the video player and buttons are always visible, regardless of
the window size, you can apply some CSS styling in the index.html file to create
a responsive layout. For example, you can use Flexbox to center the elements
vertically and horizontally:

{code block}

With these changes, the application window will open with the specified dimensions, ensuring that all user interface elements are visible. The minimum window size will prevent the user from resizing the window to a point where elements might be hidden. The Flexbox layout centers the elements in the window to maintain a clean and functional appearance.


## Iteration 5
***auraelius@gmail.com
that works. the next additional functionality is to process an entire folder of
video files. Instead of selecting a single video file, the user should be able
to select either multiple files in one folder or the entire folder itself. the
program should loop through the files, one by one, playing and moving them in
response to keep/discard buttons as before. The all the video files have been
played and moved, display a message, "That's all, folks!"***

To implement the functionality to process multiple video files or an entire folder, follow these steps:

Modify the main.js file to support selecting multiple files or a folder.
javascript

{code block}

Modify the renderer.js file to handle multiple files and folder selection,
playing each file in sequence, and displaying a message when all files have been
processed.

{code block}

Update the index.html file to show the video's filename above the player.

***{incomplete code block showing just the elements that changed, or some of them
at least }***



***auraelius@gmail.com
please complete the index.html file example***

Apologies for the incomplete response. Here's the completed index.html file:

{code block for then entire file, newest version}

With these modifications, your application should now allow the user to select multiple video files or an entire folder. The program will play each video in sequence and move the files in response to the "keep" or "discard" buttons as before. Once all video files have been played and moved, the message "That's all, folks!" will be displayed.


***The resulting version is commit 06cb05a.***

