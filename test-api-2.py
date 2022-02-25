#importing all the necessary libraries
from flask import Flask, jsonify, request

#Pysimilar - Library that uses cosine similarity to detect correlation of two strings
from pysimilar import compare


#creating database
#database=["Ford created a huge publicity machine in Detroit to ensure every newspaper carried stories and ads about the new product. Ford's network of local dealers made the car ubiquitous in almost every city in North America. As independent dealers, the franchises grew rich and publicized not just the Ford but also the concept of automobiling; local motor clubs sprang up to help new drivers and encourage them to explore the countryside. Ford was always eager to sell to farmers, who looked at the vehicle as a commercial device to help their business. Sales skyrocketed—several years posted 100% gains on the previous year.”, “In 1913, Ford introduced moving assembly belts into his plants, which enabled an enormous increase in production. Although Ford is often credited with the idea, contemporary sources indicate that the concept and development came from employees Clarence Avery, Peter E. Martin, Charles E. Sorensen, and C. Harold Wills.", "The Model T debuted on October 1, 1908. It had the steering wheel on the left, which every other company soon copied. The entire engine and transmission were enclosed; the four cylinders were cast in a solid block; the suspension used two semi-elliptic springs. The car was very simple to drive, and easy and cheap to repair. It was so cheap at $825 in 1908, with the price falling every year, that by the 1920s, a majority of American drivers had learned to drive on the Model T, despite the fact that drivers who were only familiar with the Model T's unique foot-operated planetary transmission and steering-column operated throttle-cum-accelerator had to learn a completely different set of skills to drive any other gasoline-powered automobile of the time.", "By 1918, half of all cars in the United States were Model Ts. All new cars were black; as Ford wrote in his autobiography, Any customer can have a car painted any color that he wants so long as it is black. Until the development of the assembly line, which mandated black because of its quicker drying time, Model Ts were available in other colors, including red. The design was fervently promoted and defended by Ford, and production continued as late as 1927; the final total production was 15,007,034. This record stood for the next 45 years, and was achieved in 19 years from the introduction of the first Model T.", "By 1926, flagging sales of the Model T finally convinced Ford to make a new model. He pursued the project with a great deal of interest in the design of the engine, chassis, and other mechanical necessities, while leaving the body design to his son. Although Ford fancied himself an engineering genius, he had little formal training in mechanical engineering and could not even read a blueprint. A talented team of engineers performed most of the actual work of designing the Model A (and later the flathead V8) with Ford supervising them closely and giving them overall direction. Edsel also managed to prevail over his father's initial objections in the inclusion of a sliding-shift transmission.", "Also in 1896, Ford attended a meeting of Edison executives, where he was introduced to Thomas Edison. Edison approved of Ford's automobile experimentation. Encouraged by Edison, Ford designed and built a second vehicle, completing it in 1898. Backed by the capital of Detroit lumber baron William H. Murphy, Ford resigned from the Edison Company and founded the Detroit Automobile Company on August 5, 1899. However, the automobiles produced were of a lower quality and higher price than Ford wanted. Ultimately, the company was not successful and was dissolved in January 1901."]
database=["Ford created a huge publicity machine in Detroit to ensure every newspaper carried stories and ads about the new product. Ford's network of local dealers made the car ubiquitous in almost every city in North America. As independent dealers, the franchises grew rich and publicized not just the Ford but also the concept of automobiling; local motor clubs sprang up to help new drivers and encourage them to explore the countryside. Ford was always eager to sell to farmers, who looked at the vehicle as a commercial device to help their business. Sales skyrocketed—several years posted 100% gains on the previous year."]
database_sentences = ["Ford created a huge publicity machine in Detroit to ensure every newspaper carried stories and ads about the new product.", "Ford's network of local dealers made the car ubiquitous in almost every city in North America.", "As independent dealers, the franchises grew rich and publicized not just the Ford but also the concept of automobiling; local motor clubs sprang up to help new drivers and encourage them to explore the countryside.", "Ford was always eager to sell to farmers, who looked at the vehicle as a commercial device to help their business.", "Sales skyrocketed—several years posted 100% gains on the previous year."]
#creating API
app = Flask(__name__)


@app.route('/', methods = ['GET', 'POST'])

def comparison():
    #comparing the user input with the entire database
    sentence1=request.json["user_sentence"]
    temp_list=[]
    for i in database:
        result=compare(sentence1, i)
        temp_list.append(result)
    #taking largest result and returning it
    final_result=max(temp_list)
    
    temp_list2=[]
    sentence2=sentence1.split(".")
    for j in range(0,5):
        result2=compare(sentence2[j], database_sentences[j])
        temp_list2.append(result2)

    return jsonify(final_result, temp_list2)


if __name__ == "__main__":
    app.run(debug=True)
