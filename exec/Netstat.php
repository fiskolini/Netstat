<?php

class Netstat
{
    private $testData;

    public function __construct()
    {

    }

    /** Test connection
     * @return array
     */
    private function testIt()
    {
        $this->testData = shell_exec('python ' . realpath(__DIR__) . '/speedtest-cli.py --server 10363 --simple');
        return preg_split('/\s+/', trim($this->testData));
    }

    /**
     *
     */
    private function saveToDb()
    {
        $conn = mysqli_connect(config::DBhost, config::DBuser, config::DBpassword, config::DBname) or die('Error ' . mysqli_error($conn));

        $sql = 'INSERT INTO `stats`(`ping`,`download`, `upload`, `date`) '
            . 'VALUES ($this->testData[1],$this->testData[4],$this->testData[7],NOW())';

        try {
            mysqli_query($conn, $sql);
            mysqli_close($conn);
        } catch (\Exception $exception) {
            die($exception);
        }
    }

    /**
     * Get data from table
     * @param $gname
     * @return string
     */
    public static function getData($gname)
    {
        echo 'ssss';

        //Open connection to mysql_db from defined Database credentials
        $conn = mysqli_connect(config::DBhost, config::DBuser, config::DBpassword, config::DBname) or die('Error ' . mysqli_error($conn));
        $sql = 'SELECT date, $gname FROM stats ORDER BY date ASC;';

        $result = mysqli_query($conn, $sql) or die('Error in Selecting ' . mysqli_error($conn));

        //create an array
        $data = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $date = strtotime($row['date']) * 1000;
            $val = (float)$row[$gname];

            $data[] = array($date, $val);
        }
        //close the db connection
        mysqli_close($conn);

        return json_encode($data);
    }
}









