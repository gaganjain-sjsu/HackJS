Our project aims at delivering a simple, yet powerful application to the doctors which saves their time in visiting patients physically until very urgent.
This concept is based on saving time for the doctor and focus on more productive work.

The requirements are listed as below.

Requirements
============

**Functional:**

1.  **Login functionality for the doctor.**

    1.  Doctor should be able to login to the application successfully.

    2.  Incorrect password should not allow the user to login.

    3.  Incorrect attempts should be logged against the
        customer’s account.

    4.  Account should get locked when multiple incorrect attempts are
        logged continuously.

    5.  User password should be encrypted and stored in the database.

    6.  Login session should be held for the current login.

2.  **Display hospital selection based on maps.**

    1.  Doctor should be able to see the hospitals he’s enrolled into.

    2.  Each Hospital should be depicted as marker on the map, based on
        location parameters returned from the database.

    3.  User should be able to click on the marker to display a legend
        with additional information, helpful for the doctor to navigate
        to the hospital.

    4.  Legend against the marker should provide a link for the doctor
        to navigate to the dashboard.

    5.  The interface should be simple and intuitive.

3.  **Concise display of a patient’s information.**

    1.  Doctor should be able to view on the Dashboard, all the patients
        assigned to him for monitoring.

    2.  Patients should be displayed in the form of an informative tile,
        which depicts basic information about the patient, required by
        the doctor, like:

        1.  Age

        2.  Sex

        3.  Drug allergies if any

        4.  Height

        5.  Weight

        6.  Disease

        7.  Duration

        8.  Diagnosis status

    3.  In addition to above, there should be a graphical summary of a
        patient’s overall health which will determine if the patient
        needs to be looked upon.

    4.  Health index of the patient should be calculated objectively
        based on the readings on the devices used to monitor
        the patient.

        1.  Health index should be inversely proportional to the delta
            in the readings from the patient’s normal vital statics
            when healthy.

        2.  Other than the readings, other factors which impact the
            health index should be blood and other time test reports,
            which are directly fed to the patient’s database.

        3.  Factors influencing patients’ health:

            1.  History of a disease.

            2.  Current readings.

            3.  Severity of occurrence of the disease.

            4.  No of abnormal readings

            5.  Blood reports

            6.  Any surgery having some correlation with the disease.

            7.  Patient’s health history.

        4.  The health index should have a span of last seven days which
            should be able to tell the doctor whether the health is on
            the rise or fall.

    5.  Any anomaly should be highlighted to the doctor as a tip when
        hovering over a patient’s tile. *As a future scope this can be
        derived from the machine learning models which will be able to
        deduce information on the type of action taken by the doctor
        during the past.*

4.  **Chat functionality** should be provided to the doctors in case
    they want to speak with the hospital staff directly. This can also
    be a mechanism to alert the ground staff in case doctor sees any
    weird behavior.

5.  **Live monitoring of patients’ health data.**

    1.  **Assumptions** –

        1.  Patients are being monitored using IoT devices capable of
            sending the health data over the internet.

        2.  The IoT devices should also be capable of receiving inputs
            and control the medication amount the patient has to
            be provided.

    2.  **Requirements – **

        1.  A model should be displayed to the doctor as soon patient’s
            profile is clicked.

        2.  First thing the model should contain is Patient’s history
            depicted on a graph. This combined graph will show below
            data:

            1.  Surgery milestones.

            2.  Chronic diseases as an area graph plotted against the
                intensity with which it has impacted.

            3.  Details of the major medications and treatments as line
                charts superimposed over the area graph.

            4.  Any episodes of mental or physical stress shown as
                colors to form a heat map which will depict patient’s
                state during an illness. This helps doctors suggest the
                start and tenure of medication.

            5.  Any callouts by patient while providing information are
                displayed on a model when the graph is hovered upon.

        3.  Model should contain live spline charts for the continuous
            data stream, pushed by the IoT devices to the front end. Web
            sockets can be used on the IoT devices as a mechanism to
            establish bi-directional communication with the front end.

        4.  Spline charts should be indicative of the current readings
            vs the normal, which will make it helpful for the doctor to
            determine the delta and hence not spend too much time in
            analysis of data.

        5.  Each graph should have a label showing what the readings
            correspond to.

        6.  Larger variations should be displayed as colored indicative
            of a potential problem with the patient. A popup should
            appear in such a case, providing the doctor a mechanism to
            alert the hospital staff and provide instructions how to
            deal with the situation. Doctor may choose to close that and
            continue ahead.

        7.  Each graph should have a button which will help enable or
            disable it as per doctors’ choice.

        8.  If the monitoring is turned on, the graph should
            be rendered.

        9.  In case the monitoring is turned off, the device should be
            sent a signal to stop monitoring the patient, hence saving
            energy and resources.

        10. There should be a Medication button associated with each
            graph, indicating that the doctor can prescribe mediation
            which can help straighten the problem which was deduced by
            the doctor after looking at that graph.

6.  **Medicating a patient remotely.**

    1.  When the doctor clicks on the medication button, a model should
        appear showing a dropdown from which a medicine can be selected,
        and an add button.

    2.  Dropdown should be intelligently populated depending on the
        medication the patient is allergic to.

        The medication which might cause any reactions should be grayed
        out depending on the allergy information provided by the
        patient, or which appears from the blood or other test results.

    3.  Once the medication is selected from the dropdown, doctor should
        be able to add it using the add button. Adding the same
        medication should not do anything.

    4.  Once a medication is added, there should be a medication level
        bar, which can be dragged to specify the quantity/concentration
        in %v/v. The number associated with it should be displayed to
        the doctor to determine the correctness.

    5.  There should also be a switch against each medicine, which will
        help to remove it in case not necessary.

    6.  The quantity of medication should be sent to the medication
        control IoT device which will trigger the medication.

        In case of simulator, it should be the same Web socket
        communication enabled device, capable of receiving the medicine
        quantity input and modify the randomness of the data generated,
        simulating that the patient has actually benefited from
        the medication.

    7.  Against all the added medications, there should be a switch to
        turn on and off medication as doctor feels comfortable.

**Performance:**

1.  Multiple users should be able to login to the application at the
    same time.

2.  Multiple users should be able to load up Dashboard quickly.

3.  Graphs should not take too much time to load for single as well as
    multiple users/

4.  Spline charts should be able to display data with the same frequency
    as received from the Web socket.

5.  Multiple patients should be able to subscribe with one device
    emulator Web socket.

    1.  Web socket server should be able to serve multiple clients.

    2.  Web sockets should be able to receive post requests for multiple
        clients for medication update.

6.  Multiple clients should be able to issue requests to the database at
    the same time.

    1.  Web socket should be able to push patient data to the database
        which should be able to handle the rate at which the data
        is fed.

    2.  Data retrieval for multiple queries should be work fine, so as
        not to cause delays in data rendering on the UI.


