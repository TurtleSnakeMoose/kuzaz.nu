var kzzn = kzzn || {};
kzzn.translate = kzzn.translate || {};

kzzn.translate.english = {
        participant_help: ` Name all the participants that should be included in the calculation. <br />
                            Duplicate names will not be added.
                            <br />
                            <br />
                            <strong>Incases where a participant is paying for several participants:</strong> <br />
                            Specify the count (including himself) and don't add these people to the list. <br /> 
                            e.g.: <i>If the husband is paying for himself AND his wife, You should only add the husband to the list and put in '2' as the amount.</i><br />
                            <br />
                            <strong> Alter the participant's "Count" or remove him completely if needed,</strong></br>
                            Do so, using the <i class="fas fa-plus-circle"></i>, <i class="fas fa-minus-circle"></i> and <i class="fas fa-trash"></i> icons.</br>
                            <br />
                            <strong> Don't forget to specify each participant's payments - mainpot and/or sidepots.</strong></br>
                            Setup the parcipants's contributions by clicking the <i class="fas fa-shekel-sign"></i> icon.<br />
                            <br />
                            Click on "<strong>SUMMARY</strong>" to show... well... The summary...<br/>
                            <br />
                            Click on "<strong>CALCULATE</strong>", The reason you're here. Calculate the money distribution between participants so everyone breaks even. <br/>`,

        payments_help: `  Expenses are split into 2 catagories: "Main pot" and "Side pot".<br />
                            <strong>Main pot:</strong><br />
                            There's only one main pot and it should only include expenses that are shared equally between <strong>ALL</strong> participants.<br />
                            e.g.: <i>vanue rent fee, food, snacks, soft drinks, shared service such as catering or strippers, etc...</i><br/>
                            Leave empty or '0' if there's no contribution to the main pot.<br/>
                            <br />
                            <strong>Side pot:</strong> <br />
                            Create as many side pots as you need.<br />
                            These should only include expenses that are shared equally between <strong>SOME</strong> of the participants.<br/>
                            Specify the sidepot amount and participants, finally push the 'Add to sidepots'.<br/>
                            e.g.: <i>Mike bought the weed, But only Mike,Vova and Slava are weed smokers.
                            In this case, mark this expense as a side pot and select Mike,Vova and Slava as the participants.</i><br/>
                            Remove a side pot by pressing the <i class="fas fa-trash"></i> icon.`,

        summary_help: `  <strong>Contributions Summary</strong><br/>
                            Mainpot and sidepot contributions, simplified breakdown.</br>
                            <br/>
                            Pushing <i class="fas fa-copy"></i> will copy this info to clipboard as plain text.<br/>
                            <br/>
                            Pushing <i class="fab fa-whatsapp"></i> will share this info as text straight to <i>whatsApp</i>.`,

        result_help: `  <strong>Final results</strong><br/>
                            Transactions were calculated in a way where it does'nt matter who gets paid by who,<br/>
                            As long as everyone breaks even.<br/>
                            <br/>
                            Pushing <i class="fas fa-copy"></i> will copy this table to clipboard as plain text.<br/>
                            <br/>
                            Pushing <i class="fab fa-whatsapp"></i> will share this table as text straight to <i>whatsApp</i>.`,

        import_export_help: `  <strong>Import/Export</strong><br/>
                            <br/>
                            <strong>Export</strong><br/>
                            Refreshing kuzaz.nu will reset the data you've worked on,<br/>
                            To continue working on this later or to just review the data at a later time,<br/>
                            Copy the text under "Export" and save it where it's accessible.<br/>
                            <br/>
                            <strong>Imoport</strong><br/>
                            Paste the text you've exported into the textbox under "Import".<br/>
                            If the text is valid, the "IMPORT" button will be enabled.<br/>
                            Press the button and all the data you've started working on will magically reappear.<br/>`,
        participant_list: `Participant List`,
        name: `Name`,
        add: `ADD`,
        count: `Count`,
        summary: `SUMMARY`,
        calculate: `CALCULATE`,
        mainpot_contribution: `Mainpot contribution`,
        sidepot_cost: `Sidepot cost`,
        for: `For`,
        add_to_sidepot: `ADD TO SIDEPOTS`,
        save_and_close: `SAVE AND CLOSE`,
        mainpot_summary: `Mainpot summary`,
        mainpot_contributors: `Mainpot contributors`,
        sidepot_summary: `Sidepot summary`,
        sidepot_contributors: `Sidepot contributors`,
        close: `CLOSE`,
        summary_copied: `Summary copied to clipboard!`,
        final_transactions: `FINAL TRANSACTIONS`,
        from: `From`,
        to: `To`,
        amount: `Amount`,
        close: `CLOSE`,
        result_copied: `result copied to clipboard!`,
        import_export: `IMPORT / EXPORT`,
        export: `Export`,
        copy: `COPY`,
        import_export_copied: `Data copied to clipboard!`,
        import: `Import`,
        close: `CLOSE`
}


kzzn.translate.hebrew = {
    participant_help: ` הזינו את שמות כל המשתתפים שיש להכליל בחישוב. <br />
                        שמות זהים לא יתקבלו.
                        <br />
                        <br />
                        <strong>במקרים בהם משתתף משלם עבור מספר משתתפים:</strong> <br />
                        הזינו את הכמות (כולל את עצמו) ואל תכניסו את שמותיהם לרשימה. <br /> 
                        דוגמא: <i>אם הבעל משלם גם עבור אישתו, ציינו בכמות שלו '2' ואל תוסיפו את אשתו לרשימה.</i><br />
                        <br />
                        <strong> ניתן לשנות את הכמות או להסיר את המשתתף מהרשימה,</strong></br>
                        עשו זאת בעזרת הלחצנים <i class="fas fa-plus-circle"></i>, <i class="fas fa-minus-circle"></i> ו <i class="fas fa-trash"></i>.</br>
                        <br />
                        <strong> לא לשכוח להגדיר עבור כל משתתף ששילם, כמה שילם לאיזו קופה.</strong></br>
                        הגדירו את התשלומים של המשתתפים בלחיצה על <i class="fas fa-shekel-sign"></i>.<br />
                        <br />
                        לחיצה על "<strong>סיכום</strong>" תציג את....הסיכום...<br/>
                        <br />
                        לחיצה על "<strong>חשב</strong>", הסיבה שאנחנו כאן, החישוב של מי צריך להעביר כסף למי, וכמה. בקיצור...התקזזויות. <br/>`,

    payments_help: `  הוצאות מתחלקות ל2 קטגוריות, "קופה ראשית" ו "קופות צדדיות".<br />
                        <strong>קופה ראשית:</strong><br />
                        יש רק קופה ראשית אחת והיא צריך לכלול רק הוצאות שמתחלקות בין <strong>כל</strong> המשתתפים.<br />
                        לדוגמא: <i>שכירות על מקום, אוכל, תשלום על שירותים כמו קייטרינג או חשפניות...</i><br/>
                        יש להשאיר ריק או '0' במידה והמשתתף לא קנה/שילם עבור כלום לקופה הראשית.<br/>
                        <br />
                        <strong>קופות צדדיות:</strong> <br />
                        צרו כמה קופות צדדיות שאתם צריכים.<br />
                        צריכות לכלול הוצאות עבור דברים שיחולקו בין <strong>חלק</strong> מהמשתתפים.<br/>
                        הזינו את סכום הקופה הצדדית, בחרו אילו משתתפים חולקים את ההוצאה של הקופה ולחצו על 'הוסף לקופה ראשית'.<br/>
                        לדוגמא: <i>מיכאל קנה אלכוהול אבל רק מיכאל,אלי,ואלכס שותים. במקרה זה ציינו את עלות האלכוהול שמיכאל קנה ותבחרו במיכאל, אלכס ואלי כמשתתפים בקופה.</i><br/>
                        לחיצה על לחצן ה <i class="fas fa-trash"></i> תסיר את הקופה מהרשימה.`,

    summary_help: `  <strong>סיכום הוצאות</strong><br/>
                        סיכום פשוט של כל התרומות לקופה הראשית ולקופות הצדדיות.</br>
                        <br/>
                        לחיצה על <i class="fas fa-copy"></i> תעתיק את הסיכום כטקסט אותו תוכלו להדביק איפה שתרצו.<br/>
                        <br/>
                        לחיצה על <i class="fab fa-whatsapp"></i> תאפשר את שליחת הסיכום ישירות לוואטסאפ.`,

    result_help: `  <strong>רשימת התקזזות</strong><br/>
                        התקזזוית חושבו בצורה כזו שאין חשיבות למי מעביר למי ובאיזה סדר, העיקר שכולם שווים ואין מופסדים.<br/>
                        <br/>
                        לחיצה על <i class="fas fa-copy"></i> תעתיק את הטבלה כטקסט כדי שתוכלו להדביק איפה שתרצו.<br/>
                        <br/>
                        לחיצה על <i class="fab fa-whatsapp"></i> תאפשר את שליחת הטבלה ישירות לוואטסאפ.`,

    import_export_help: `  <strong>יבוא/יצוא</strong><br/>
                        <br/>
                        <strong>יצוא</strong><br/>
                        ריענון האתר תגרום לכם לאבד את כל הנתונים,<br/>
                        כדי להמשיך לעבוד על הנתונים או לחזור לאותה נקודה, מאוחר יותר,<br/>
                        העתיקו את הטקסט תחת 'יצוא' ותשמרו אותו איפשהו.<br/>
                        <br/>
                        <strong>יבוא</strong><br/>
                        הדביקו את הטקסט ששמרתם לתיבה תחת 'יבוא'.<br/>
                        אם הטקסט תקין, כפתור ה'יבוא' יהיה לחיץ,<br/>
                        לחיצה על הכפתור תעשה הוקוס פוקוס וכל הנתונים יופיעו במסך.<br/>`,
    participant_list: `רשימת משתתפים`,
    name: `שם`,
    add: `הוספה`,
    count: `כמות`,
    summary: `סיכום`,
    calculate: `חשב`,
    mainpot_contribution: `תרומה לקופה הראשית`,
    sidepot_cost: `עלות קופה צדדית`,
    for: `עבור`,
    add_to_sidepot: `הוספה לקופה צדדית`,
    save_and_close: `שמור וסגור`,
    mainpot_summary: `סיכום קופה ראשית`,
    mainpot_contributors: `תורמים לקופה ראשית`,
    sidepot_summary: `סיכום קופות צדדיות`,
    sidepot_contributors: `תורמים לקופות צדדיות`,
    close: `סגור`,
    summary_copied: `סיכום הועתק!`,
    final_transactions: `טבלת התקזזויות`,
    from: `ממי`,
    to: `למי`,
    amount: `סכום`,
    close: `סגור`,
    result_copied: `טבלת התקזזויות הועתקה!`,
    import_export: `יבוא / יצוא`,
    export: `יצוא`,
    copy: `העתק`,
    import_export_copied: `נתונים הועתקו!`,
    import: `יבוא`,
    close: `סגור`
}