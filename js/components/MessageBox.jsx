import React, {useEffect, useRef} from 'react';

function MessageBox(props) {
    const messagesEndRef = useRef(null);
    const { chatMessages, } = props;

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', });
    }
    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    return (
        <div className={'h-[400px] overflow-auto px-[20px]'}>
            <ul className={'divide-y divide-gray-200'}>
                <li className={ 'py-3' }>
							<span className={ `block text-blue-400 font-bold` }>
								ChatGPT:
							</span>
                    <span className={'block text-blue-950 font-italic'}>
								Hello, I am a ChatBot. How can I help you?
							</span>
                </li>
                {
                    chatMessages.map((message, index) => {
                        return (
                            <li className={'py-3'} key={index}>
								<span className={ `block ${message.role === 'assistant' ? 'text-blue-950' : 'text-red-600'} font-bold` }>
									{
                                        message.role === 'assistant' ? 'ChatGPT:' : 'You:'
                                    }
								</span>
                                <span className={ 'block' }>
									{
                                        message.content
                                    }
								</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div ref={ messagesEndRef } />
        </div>
    );
}

export default MessageBox;