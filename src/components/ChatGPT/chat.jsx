import './chat.css'
import $ from 'jquery'
import axios from 'axios'
import Config from '../../config';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';

function Chat() {

    const sendQuestion = () => {
        var question = $("#question-input").val();
        if (question) {
          var timestamp = new Date().toLocaleTimeString();
          $("#chat-area").append("<div container class='message-container'><div class='row'><div class='col timestamp'><p class='small mb-1 text-muted'>" + timestamp + "</p></div></div><div class='row user-message'><div class='col'><span>" + question + "<span></div></div></div>");
          $("#question-input").val("");
          $("#chat-area").scrollTop($("#chat-area").prop("scrollHeight"));
          $("#loading-indicator").show();
          $.ajax({
            url: Config.server +'/api/chat',
            type: "POST",
            contentType: "application/json",
            // Headers: {

            // }
            data: JSON.stringify({ question: question }),
            success: function(data) {
              var response = data.response.replace(/\n/g, "<br><br>");
              var typingSpeed = 50; // in milliseconds
              var responseArray = response.split(" ");
              var currentIndex = 0;
              var responseTimer = setInterval(function() {
                if (currentIndex < responseArray.length) {
                  var responseText = responseArray.slice(0, currentIndex + 1).join(" ");
                  $("#typing-indicator").html(responseText);
                  currentIndex++;
                } else {
                  clearInterval(responseTimer);
                  var timestamp = new Date().toLocaleTimeString();
                  $("#typing-indicator").html("");
                  var response = data.response.replace(/\n/g, "<br>");
                  $("#chat-area").append("<div container class='message-container'><div class='row'><div class='col bot-timestamp'><p class='small mb-1 text-muted'>" + timestamp + "</p></div></div><div class='row bot-message'><div class='col'><span>" + response.replace(/\n/g, "<br><br>").replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank'>$1</a>") + "<span></div></div></div>");
                  $("#chat-area").scrollTop($("#chat-area").prop("scrollHeight"));
                  $("#loading-indicator").hide();  
                }
              }, typingSpeed);

            },
            error: function() {
              alert("Unable to process the request.");
              $("#loading-indicator").hide();
            }
          });
        }
    };

    const keyDown = (event) => {
        if (event.keyCode == 13) {
            sendQuestion();
            $("#question-input").val("");
            return false;
        }
    }
    
    return (
        <>
            <div id="forward">
                <a href = '/'><TiArrowBack size="4em"/></a>
            </div>
            <div id="chat-box">
                <div id="chat-area"></div>
                <div id="input-area" >
                    <input type="text" id="question-input" placeholder="Ask here" onKeyDown={keyDown}/>
                    <button id="send-button" onClick={sendQuestion}>Send</button>
                </div>
                <div id="typing-indicator"></div>
                <div id="loading-indicator">
                    <div className="loader"></div>
                </div>
            </div>
        </>
    )
}

export default Chat;